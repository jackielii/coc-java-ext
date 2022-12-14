// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { commands, Extension, ExtensionApi, extensions, window, workspace } from 'coc.nvim'

///////////////// vscode-java constants
/**
 * Get the project settings
 */
export const GET_PROJECT_SETTINGS = 'java.project.getSettings'

/**
 * Get all java projects root path in URI format
 */
export const GET_ALL_JAVA_PROJECTS = 'java.project.getAll'

//////////////// vscode-java-dependency constants
export const JAVA_PROJECT_LIST = 'java.project.list'

//////////////// vscode-java-debug constants
export const VSCODE_STARTDEBUG = 'vscode.startDebug'

export const VSCODE_ADD_DEBUGCONFIGURATION = 'debug.addConfiguration'

export const JAVA_START_DEBUGSESSION = 'vscode.java.startDebugSession'

export const JAVA_RESOLVE_CLASSPATH = 'vscode.java.resolveClasspath'

export const JAVA_RESOLVE_MAINCLASS = 'vscode.java.resolveMainClass'

export const JAVA_VALIDATE_LAUNCHCONFIG = 'vscode.java.validateLaunchConfig'

export const JAVA_BUILD_WORKSPACE = 'vscode.java.buildWorkspace'

export const JAVA_EXECUTE_WORKSPACE_COMMAND = 'java.execute.workspaceCommand'

export const JAVA_FETCH_USAGE_DATA = 'vscode.java.fetchUsageData'

export const JAVA_UPDATE_DEBUG_SETTINGS = 'vscode.java.updateDebugSettings'

export const JAVA_RESOLVE_MAINMETHOD = 'vscode.java.resolveMainMethod'

export const JAVA_INFER_LAUNCH_COMMAND_LENGTH = 'vscode.java.inferLaunchCommandLength'

export const JAVA_CHECK_PROJECT_SETTINGS = 'vscode.java.checkProjectSettings'

export const JAVA_RESOLVE_ELEMENT_AT_SELECTION = 'vscode.java.resolveElementAtSelection'

export const JAVA_RESOLVE_BUILD_FILES = 'vscode.java.resolveBuildFiles'

export const JAVA_IS_ON_CLASSPATH = 'vscode.java.isOnClasspath'

export const JAVA_RESOLVE_JAVAEXECUTABLE = 'vscode.java.resolveJavaExecutable'

export const JAVA_FETCH_PLATFORM_SETTINGS = 'vscode.java.fetchPlatformSettings'

export const JAVA_RESOLVE_CLASSFILTERS = 'vscode.java.resolveClassFilters'

export const JAVA_RESOLVE_SOURCE_URI = 'vscode.java.resolveSourceUri'

export const JAVA_RESOLVE_INLINE_VARIABLES = 'vscode.java.resolveInlineVariables'

export function executeJavaLanguageServerCommand(...rest: any[]) {
  return executeJavaExtensionCommand(JAVA_EXECUTE_WORKSPACE_COMMAND, ...rest)
}

export async function executeJavaExtensionCommand(commandName: string, ...rest: any[]) {
  // TODO: need to handle error and trace telemetry
  const javaExtension = getJavaExtension()
  if (!javaExtension) {
    window.showMessage('Java extension is not installed', 'error')
    return
  }
  if (!javaExtension.isActive) {
    await javaExtension.activate()
  }
  return commands.executeCommand(commandName, ...rest)
}

const JAVA_EXTENSION_ID = 'coc-java'

export function getJavaExtension(): Extension<ExtensionApi> | undefined {
  return extensions.all.find((extension) => extension.id === JAVA_EXTENSION_ID)
}
