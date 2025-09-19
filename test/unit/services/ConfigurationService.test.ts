import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { ConfigurationService } from '../../../src/services/ConfigurationService';
import { ExtensionContainer } from '../../../src/core/ExtensionContainer';

describe('ConfigurationService', () => {
    let configurationService: ConfigurationService;
    let container: ExtensionContainer;
    let workspaceGetConfigurationStub: sinon.SinonStub;
    let configurationMock: any;

    beforeEach(() => {
        container = new ExtensionContainer();
        
        // Create a proper mock configuration object
        configurationMock = {
            get: sinon.stub(),
            has: sinon.stub(),
            inspect: sinon.stub(),
            update: sinon.stub()
        };
        
        workspaceGetConfigurationStub = sinon.stub(vscode.workspace, 'getConfiguration')
            .returns(configurationMock);
        
        configurationService = new ConfigurationService(container);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('get', () => {
        it('should get configuration value with default', () => {
            const expectedValue = 'test-value';
            configurationMock.get.returns(expectedValue);

            const result = configurationService.get('test.key', 'default-value');

            expect(result).to.equal(expectedValue);
            expect(workspaceGetConfigurationStub.calledWith('copilotCustomizer')).to.be.true;
            expect(configurationMock.get.calledWith('test.key', 'default-value')).to.be.true;
        });

        it('should return default value when configuration not found', () => {
            const defaultValue = 'default-value';
            configurationMock.get.returns(undefined);

            const result = configurationService.get('nonexistent.key', defaultValue);

            expect(result).to.equal(defaultValue);
        });
    });

    describe('set', () => {
        it('should set configuration value globally', async () => {
            configurationMock.update.resolves();

            await configurationService.set('test.key', 'new-value');

            expect(configurationMock.update.calledWith('test.key', 'new-value', vscode.ConfigurationTarget.Global)).to.be.true;
        });

        it('should handle configuration update errors', async () => {
            configurationMock.update.rejects(new Error('Update failed'));

            try {
                await configurationService.set('test.key', 'new-value');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error).to.be.instanceOf(Error);
                expect((error as Error).message).to.include('Update failed');
            }
        });
    });

    describe('getContextConfig', () => {
        it('should return default context config', () => {
            const contextConfig = {
                includeChatMode: true,
                includePromptTemplate: true,
                instructionInclude: [],
                instructionExclude: [],
                autoConfirm: true,
                autoConfirmToken: 'confirm'
            };

            configurationMock.get
                .withArgs('context').returns(contextConfig)
                .withArgs('commandOverrides').returns({});

            const result = configurationService.getContextConfig();

            expect(result.includeChatMode).to.be.true;
            expect(result.autoConfirm).to.be.true;
            expect(result.autoConfirmToken).to.equal('confirm');
        });

        it('should handle command-specific overrides', () => {
            const defaultContext = {
                includeChatMode: true,
                includePromptTemplate: true,
                instructionInclude: [],
                instructionExclude: [],
                autoConfirm: true,
                autoConfirmToken: 'confirm'
            };

            const commandOverrides = {
                'newChatMode': {
                    includeChatMode: false,
                    autoConfirm: false
                }
            };

            configurationMock.get
                .withArgs('context').returns(defaultContext)
                .withArgs('commandOverrides').returns(commandOverrides);

            const result = configurationService.getContextConfig('newChatMode');

            expect(result.includeChatMode).to.be.false;
            expect(result.includePromptTemplate).to.be.true; // Should inherit from default
            expect(result.autoConfirm).to.be.false;
        });
    });

    describe('onConfigurationChanged', () => {
        it('should register configuration change listener', () => {
            const mockDisposable = { dispose: sinon.stub() };
            const onDidChangeConfigurationStub = sinon.stub(vscode.workspace, 'onDidChangeConfiguration')
                .returns(mockDisposable);

            const callback = sinon.stub();
            const result = configurationService.onConfigurationChanged(callback);

            expect(onDidChangeConfigurationStub.calledOnce).to.be.true;
            expect(result).to.equal(mockDisposable);

            onDidChangeConfigurationStub.restore();
        });
    });
});