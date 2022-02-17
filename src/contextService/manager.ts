﻿'use strict'

import type IDisposable from "../IDisposable";
import { ExtensionContext } from 'vscode';
import { AbsContextService } from "./IContextService";
import { ContextServiceEditorInMarkdownList } from "./contextServiceInMarkdownList";
import { ContextServiceEditorInFencedCodeBlock } from "./contextServiceInFencedCodeBlock";
import { ContextServiceEditorInMathEn } from "./contextServiceInMathEnv";

export class ContextServiceManager implements IDisposable {
    private readonly contextServices: Array<AbsContextService> = [];

    public constructor() {
        // push context services
        this.contextServices.push(new ContextServiceEditorInMarkdownList("markdown.extension.editor.cursor.inMarkdownList"));
        this.contextServices.push(new ContextServiceEditorInFencedCodeBlock("markdown.extension.editor.cursor.inFencedCodeBlock"));
        this.contextServices.push(new ContextServiceEditorInMathEn("markdown.extension.editor.cursor.inMathEnv"));
    }

    public activate(context: ExtensionContext) {
        for (const service of this.contextServices) {
            service.activate(context);
        }
    }

    public dispose(): void {
        while (this.contextServices.length > 0) {
            const service = this.contextServices.pop();
            service.dispose();
        }
    }
}

export const contextServiceManager = new ContextServiceManager();
