const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const themesDir = path.join(rootDir, 'themes');

// Palettes definition for the 4 Zed variants
const palettes = {
  light: {
    name: 'Zed Light',
    type: 'light',
    bg: '#fafafa',
    bgSubtle: '#ebebec',
    bgElevated: '#f0f0f0',
    bgChrome: '#dcdcdd',
    bgInput: '#ffffff',
    border: '#dfdfe0',
    borderSubtle: '#d0d0d2',
    borderStrong: '#c9c9ca',
    fg: '#242529',
    fgBright: '#111111',
    fgMuted: '#737376',
    fgDim: '#919197',
    accent: '#5c78e2',
    accentHover: '#4c68d2',
    accentActive: '#3882b7',
    accentSubtle: '#5c78e21a',
    accentMedium: '#5c78e233',
    blue: '#5b79e3',
    cyan: '#3882b7',
    green: '#649f57',
    greenAdded: '#27a657',
    greenDiff: '#50a14f',
    amber: '#c18401',
    amberWarning: '#d3b020',
    red: '#d3604f',
    redDeleted: '#e06c76',
    redError: '#e45649',
    purple: '#a449ab',
    orange: '#ad6e25',
    selection: '#c8d6ff',
    selectionHighlight: '#e5e5e680',
    lineHighlight: '#ebebec80',
    shadow: '#00000014',
    rainbow: ['#5b79e3', '#a449ab', '#c18401', '#649f57', '#3882b7', '#d3604f']
  },
  dark: {
    name: 'Zed Dark',
    type: 'dark',
    bg: '#282c33',
    bgSubtle: '#2f343e',
    bgElevated: '#21252b',
    bgChrome: '#3b414d',
    bgInput: '#1e2227',
    border: '#363c46',
    borderSubtle: '#3e4451',
    borderStrong: '#474e5c',
    fg: '#acb2be',
    fgBright: '#dce0e5',
    fgMuted: '#8e939b',
    fgDim: '#6c767a',
    accent: '#74ade8',
    accentHover: '#85c1ff',
    accentActive: '#61afef',
    accentSubtle: '#74ade81a',
    accentMedium: '#74ade833',
    blue: '#73ade9',
    cyan: '#6eb4bf',
    green: '#a1c181',
    greenAdded: '#27a657',
    greenDiff: '#98c379',
    amber: '#dfc184',
    amberWarning: '#d3b020',
    red: '#d07277',
    redDeleted: '#e06c76',
    redError: '#e06c75',
    purple: '#b477cf',
    orange: '#bf956a',
    selection: '#3e4451',
    selectionHighlight: '#3e445180',
    lineHighlight: '#2f343e80',
    shadow: '#00000040',
    rainbow: ['#73ade9', '#b477cf', '#dfc184', '#a1c181', '#6eb4bf', '#d07277']
  },
  oled: {
    name: 'Zed OLED',
    type: 'dark',
    bg: '#000000',
    bgSubtle: '#090a0c',
    bgElevated: '#0d0f12',
    bgChrome: '#111317',
    bgInput: '#000000',
    border: '#1e222a',
    borderSubtle: '#262a33',
    borderStrong: '#363c46',
    fg: '#acb2be',
    fgBright: '#ffffff',
    fgMuted: '#6f757f',
    fgDim: '#555b66',
    accent: '#74ade8',
    accentHover: '#85c1ff',
    accentActive: '#61afef',
    accentSubtle: '#74ade81a',
    accentMedium: '#74ade833',
    blue: '#73ade9',
    cyan: '#6eb4bf',
    green: '#a1c181',
    greenAdded: '#27a657',
    greenDiff: '#98c379',
    amber: '#dfc184',
    amberWarning: '#d3b020',
    red: '#d07277',
    redDeleted: '#e06c76',
    redError: '#e06c75',
    purple: '#b477cf',
    orange: '#bf956a',
    selection: '#3e4451',
    selectionHighlight: '#3e445180',
    lineHighlight: '#16181d80',
    shadow: '#00000060',
    rainbow: ['#73ade9', '#b477cf', '#dfc184', '#a1c181', '#6eb4bf', '#d07277']
  },
  mirage: {
    name: 'Zed Mirage',
    type: 'dark',
    bg: '#1f2430',
    bgSubtle: '#191e2a',
    bgElevated: '#141820',
    bgChrome: '#171b24',
    bgInput: '#191e2a',
    border: '#2d3545',
    borderSubtle: '#384257',
    borderStrong: '#434e66',
    fg: '#cbccc6',
    fgBright: '#f3f4f5',
    fgMuted: '#707a8c',
    fgDim: '#5c6773',
    accent: '#73d0ff',
    accentHover: '#99e0ff',
    accentActive: '#59c2ff',
    accentSubtle: '#73d0ff1a',
    accentMedium: '#73d0ff33',
    blue: '#73d0ff',
    cyan: '#95e6cb',
    green: '#bae67e',
    greenAdded: '#87d96c',
    greenDiff: '#bae67e',
    amber: '#ffb454',
    amberWarning: '#ffd173',
    red: '#f28779',
    redDeleted: '#f07178',
    redError: '#f28779',
    purple: '#d4bfff',
    orange: '#ff8f40',
    selection: '#273747',
    selectionHighlight: '#27374780',
    lineHighlight: '#24293680',
    shadow: '#00000045',
    rainbow: ['#73d0ff', '#d4bfff', '#ffb454', '#bae67e', '#95e6cb', '#ff8f40']
  }
};

function generateTheme(p) {
  const isDark = p.type === 'dark';

  const semanticTokenColors = {
    function: p.blue,
    'function.declaration': p.blue,
    method: p.blue,
    'method.declaration': p.blue,
    class: p.cyan,
    interface: p.cyan,
    type: p.cyan,
    typeParameter: p.cyan,
    parameter: p.red,
    variable: p.fg,
    'variable.readonly': p.amber,
    'variable.declaration': p.fg,
    property: p.red,
    'property.declaration': p.red,
    'property.readonly': p.red,
    namespace: p.fgBright,
    enumMember: p.amber,
    enum: p.cyan,
    decorator: p.orange,
    macro: {
      foreground: p.blue,
      fontStyle: 'bold'
    },
    string: p.green,
    number: p.orange,
    keyword: p.purple,
    comment: {
      foreground: p.fgMuted,
      fontStyle: 'italic'
    },
    regexp: p.orange,
    constant: p.amber,
    boolean: p.orange,
    operator: p.cyan
  };

  const colors = {
    // Activity Bar
    'activityBar.activeBackground': '#00000000',
    'activityBar.activeBorder': p.accent,
    'activityBar.background': p.bgSubtle,
    'activityBar.border': p.border,
    'activityBar.dropBorder': p.accent,
    'activityBar.foreground': p.fgBright,
    'activityBar.inactiveForeground': p.fgDim,
    'activityBarBadge.background': p.accent,
    'activityBarBadge.foreground': isDark ? '#1e2227' : '#ffffff',

    // Badges & Banners
    'badge.background': p.accent,
    'badge.foreground': isDark ? '#1e2227' : '#ffffff',
    'banner.background': p.bgSubtle,
    'banner.foreground': p.fg,
    'banner.iconForeground': p.accent,

    // Breadcrumbs
    'breadcrumb.activeSelectionForeground': p.fgBright,
    'breadcrumb.background': p.bg,
    'breadcrumb.focusForeground': p.fgBright,
    'breadcrumb.foreground': p.fgDim,
    'breadcrumbPicker.background': p.bgElevated,

    // Buttons
    'button.background': p.accent,
    'button.border': '#00000000',
    'button.foreground': isDark ? '#1e2227' : '#ffffff',
    'button.hoverBackground': p.accentHover,
    'button.secondaryBackground': p.bgSubtle,
    'button.secondaryForeground': p.fgBright,
    'button.secondaryHoverBackground': p.border,
    'button.separator': p.borderSubtle,

    // Charts
    'charts.blue': p.blue,
    'charts.foreground': p.fg,
    'charts.green': p.green,
    'charts.lines': p.border,
    'charts.orange': p.orange,
    'charts.purple': p.purple,
    'charts.red': p.red,
    'charts.yellow': p.amber,

    // Chat
    'chat.avatarBackground': p.bgSubtle,
    'chat.avatarForeground': p.fg,
    'chat.requestBackground': p.bg,
    'chat.requestBorder': p.borderSubtle,
    'chat.slashCommandBackground': p.accentMedium,
    'chat.slashCommandForeground': p.accent,

    // Checkbox
    'checkbox.background': p.bg,
    'checkbox.border': p.borderSubtle,
    'checkbox.foreground': p.fg,

    // Command Center
    'commandCenter.activeBackground': p.bgSubtle,
    'commandCenter.activeBorder': p.accentMedium,
    'commandCenter.activeForeground': p.fgBright,
    'commandCenter.background': isDark ? `${p.bgSubtle}80` : '#ffffff80',
    'commandCenter.border': p.border,
    'commandCenter.foreground': p.fg,

    // Contrast
    'contrastActiveBorder': '#00000000',
    'contrastBorder': '#00000000',

    // Debug
    'debugExceptionWidget.background': p.bgElevated,
    'debugExceptionWidget.border': p.red,
    'debugIcon.breakpointCurrentStackframeForeground': p.amber,
    'debugIcon.breakpointDisabledForeground': `${p.fgDim}88`,
    'debugIcon.breakpointForeground': p.red,
    'debugIcon.breakpointStackframeForeground': p.amber,
    'debugIcon.breakpointUnverifiedForeground': `${p.fgDim}aa`,
    'debugIcon.continueForeground': p.green,
    'debugIcon.disconnectForeground': p.red,
    'debugIcon.pauseForeground': p.fg,
    'debugIcon.restartForeground': p.green,
    'debugIcon.startForeground': p.green,
    'debugIcon.stepBackForeground': p.fg,
    'debugIcon.stepIntoForeground': p.fg,
    'debugIcon.stepOutForeground': p.fg,
    'debugIcon.stepOverForeground': p.fg,
    'debugIcon.stopForeground': p.red,
    'debugTokenExpression.boolean': p.orange,
    'debugTokenExpression.error': p.red,
    'debugTokenExpression.name': p.purple,
    'debugTokenExpression.number': p.orange,
    'debugTokenExpression.string': p.green,
    'debugTokenExpression.value': p.green,
    'debugToolBar.background': p.bgElevated,
    'debugToolBar.border': p.border,
    'descriptionForeground': p.fgDim,

    // Diff Editor (Classic + Modern 1.80+)
    'diffEditor.border': p.borderSubtle,
    'diffEditor.diagonalFill': isDark ? '#3e445140' : '#e5e5e640',
    'diffEditor.insertedLineBackground': `${p.greenDiff}15`,
    'diffEditor.insertedTextBackground': `${p.greenDiff}38`,
    'diffEditor.move.border': `${p.purple}88`,
    'diffEditor.moveActive.border': p.purple,
    'diffEditor.removedLineBackground': `${p.redError}18`,
    'diffEditor.removedTextBackground': `${p.redError}38`,
    'diffEditor.unchangedCodeBackground': isDark ? `${p.bgSubtle}60` : `${p.bgElevated}60`,
    'diffEditor.unchangedRegionBackground': p.bgSubtle,
    'diffEditor.unchangedRegionForeground': p.fgDim,
    'diffEditorGutter.insertedLineBackground': `${p.greenDiff}38`,
    'diffEditorGutter.removedLineBackground': `${p.redError}38`,
    'diffEditorOverview.insertedForeground': `${p.greenDiff}aa`,
    'diffEditorOverview.removedForeground': `${p.redError}aa`,
    'disabledForeground': p.fgDim,

    // Dropdown
    'dropdown.background': p.bg,
    'dropdown.border': p.borderSubtle,
    'dropdown.foreground': p.fg,
    'dropdown.listBackground': p.bgElevated,

    // Editor Core
    'editor.background': p.bg,
    'editor.findMatchBackground': `${p.accent}66`,
    'editor.findMatchBorder': `${p.accent}aa`,
    'editor.findMatchHighlightBackground': `${p.amber}66`,
    'editor.findRangeHighlightBackground': isDark ? '#3e445140' : '#e5e5e640',
    'editor.findRangeHighlightBorder': '#00000000',
    'editor.focusedStackFrameHighlightBackground': `${p.amber}26`,
    'editor.foldBackground': `${p.accent}14`,
    'editor.foreground': p.fg,
    'editor.gutter.background': p.bg,
    'editor.hoverHighlightBackground': p.lineHighlight,
    'editor.inactiveSelectionBackground': p.lineHighlight,
    'editor.inlineValuesBackground': p.bgElevated,
    'editor.inlineValuesForeground': p.fgDim,
    'editor.lineHighlightBackground': p.lineHighlight,
    'editor.lineHighlightBorder': '#00000000',
    'editor.linkedEditingBackground': `${p.accent}26`,
    'editor.rangeHighlightBackground': `${p.accent}18`,
    'editor.selectionBackground': p.selection,
    'editor.selectionForeground': p.fgBright,
    'editor.selectionHighlightBackground': p.selectionHighlight,
    'editor.selectionHighlightBorder': '#00000000',
    'editor.snippetFinalTabstopHighlightBackground': '#00000000',
    'editor.snippetFinalTabstopHighlightBorder': p.green,
    'editor.snippetTabstopHighlightBackground': `${p.accent}26`,
    'editor.snippetTabstopHighlightBorder': p.accent,
    'editor.stackFrameHighlightBackground': `${p.green}26`,
    'editor.symbolHighlightBackground': `${p.amber}33`,
    'editor.symbolHighlightBorder': '#00000000',
    'editor.wordHighlightBackground': `${p.accent}26`,
    'editor.wordHighlightBorder': '#00000000',
    'editor.wordHighlightStrongBackground': isDark ? '#555a6366' : '#a3a3a466',
    'editor.wordHighlightStrongBorder': '#00000000',

    // Brackets (6-Hue Rainbow matching Indent Rainbow)
    'editorBracketHighlight.foreground1': p.rainbow[0],
    'editorBracketHighlight.foreground2': p.rainbow[1],
    'editorBracketHighlight.foreground3': p.rainbow[2],
    'editorBracketHighlight.foreground4': p.rainbow[3],
    'editorBracketHighlight.foreground5': p.rainbow[4],
    'editorBracketHighlight.foreground6': p.rainbow[5],
    'editorBracketHighlight.unexpectedBracket.foreground': p.red,
    'editorBracketMatch.background': `${p.accent}26`,
    'editorBracketMatch.border': `${p.accent}80`,
    'editorBracketPairGuide.activeBackground1': `${p.rainbow[0]}b3`,
    'editorBracketPairGuide.activeBackground2': `${p.rainbow[1]}b3`,
    'editorBracketPairGuide.activeBackground3': `${p.rainbow[2]}b3`,
    'editorBracketPairGuide.activeBackground4': `${p.rainbow[3]}b3`,
    'editorBracketPairGuide.activeBackground5': `${p.rainbow[4]}b3`,
    'editorBracketPairGuide.activeBackground6': `${p.rainbow[5]}b3`,
    'editorBracketPairGuide.background1': `${p.rainbow[0]}33`,
    'editorBracketPairGuide.background2': `${p.rainbow[1]}33`,
    'editorBracketPairGuide.background3': `${p.rainbow[2]}33`,
    'editorBracketPairGuide.background4': `${p.rainbow[3]}33`,
    'editorBracketPairGuide.background5': `${p.rainbow[4]}33`,
    'editorBracketPairGuide.background6': `${p.rainbow[5]}33`,

    // Cursor, CodeLens & Diagnostics
    'editorCodeLens.foreground': p.fgDim,
    'editorCursor.background': p.bg,
    'editorCursor.foreground': p.accent,
    'editorError.border': '#00000000',
    'editorError.foreground': p.red,
    'editorGhostText.background': '#00000000',
    'editorGhostText.foreground': p.fgDim,
    'editorGroup.border': p.border,
    'editorGroup.dropBackground': `${p.accent}26`,
    'editorGroup.emptyBackground': p.bg,
    'editorGroup.focusedEmptyBorder': p.accent,
    'editorGroupHeader.border': p.border,
    'editorGroupHeader.noTabsBackground': p.bg,
    'editorGroupHeader.tabsBackground': p.bgSubtle,
    'editorGroupHeader.tabsBorder': p.border,
    'editorGutter.addedBackground': p.greenAdded,
    'editorGutter.background': p.bg,
    'editorGutter.commentRangeForeground': p.fgDim,
    'editorGutter.deletedBackground': p.redDeleted,
    'editorGutter.foldingControlForeground': p.fgDim,
    'editorGutter.modifiedBackground': p.amberWarning,
    'editorHint.border': '#00000000',
    'editorHint.foreground': p.blue,
    'editorHoverWidget.background': p.bgElevated,
    'editorHoverWidget.border': p.border,
    'editorHoverWidget.foreground': p.fg,
    'editorHoverWidget.highlightForeground': p.accent,
    'editorHoverWidget.statusBarBackground': p.bgSubtle,

    // Indent Guides
    'editorIndentGuide.activeBackground1': `${p.rainbow[0]}b3`,
    'editorIndentGuide.activeBackground2': `${p.rainbow[1]}b3`,
    'editorIndentGuide.activeBackground3': `${p.rainbow[2]}b3`,
    'editorIndentGuide.activeBackground4': `${p.rainbow[3]}b3`,
    'editorIndentGuide.activeBackground5': `${p.rainbow[4]}b3`,
    'editorIndentGuide.activeBackground6': `${p.rainbow[5]}b3`,
    'editorIndentGuide.background1': `${p.rainbow[0]}33`,
    'editorIndentGuide.background2': `${p.rainbow[1]}33`,
    'editorIndentGuide.background3': `${p.rainbow[2]}33`,
    'editorIndentGuide.background4': `${p.rainbow[3]}33`,
    'editorIndentGuide.background5': `${p.rainbow[4]}33`,
    'editorIndentGuide.background6': `${p.rainbow[5]}33`,

    // Info, Inlay Hints & LightBulb
    'editorInfo.border': '#00000000',
    'editorInfo.foreground': p.blue,
    'editorInlayHint.background': isDark ? '#353b4580' : '#eaeaea80',
    'editorInlayHint.foreground': p.fgDim,
    'editorInlayHint.parameterBackground': isDark ? '#353b4580' : '#eaeaea80',
    'editorInlayHint.parameterForeground': p.orange,
    'editorInlayHint.typeBackground': isDark ? '#353b4580' : '#eaeaea80',
    'editorInlayHint.typeForeground': p.blue,
    'editorLightBulb.foreground': p.amber,
    'editorLightBulbAutoFix.foreground': p.green,
    'editorLineNumber.activeForeground': isDark ? '#d0d4da' : '#44454b',
    'editorLineNumber.foreground': p.fgDim,
    'editorLink.activeForeground': p.accent,

    // Marker Navigation (F8 Jump)
    'editorMarkerNavigation.background': p.bgElevated,
    'editorMarkerNavigationError.background': p.red,
    'editorMarkerNavigationInfo.background': p.blue,
    'editorMarkerNavigationWarning.background': p.amber,

    // Scrollbar Overview Ruler
    'editorOverviewRuler.addedForeground': `${p.greenAdded}aa`,
    'editorOverviewRuler.background': p.bg,
    'editorOverviewRuler.border': '#00000000',
    'editorOverviewRuler.bracketMatchForeground': `${p.accent}aa`,
    'editorOverviewRuler.commentForeground': `${p.fgMuted}80`,
    'editorOverviewRuler.commentUnresolvedForeground': `${p.amber}80`,
    'editorOverviewRuler.commonContentForeground': `${p.fgDim}26`,
    'editorOverviewRuler.currentContentForeground': `${p.green}33`,
    'editorOverviewRuler.deletedForeground': `${p.redDeleted}aa`,
    'editorOverviewRuler.errorForeground': `${p.red}aa`,
    'editorOverviewRuler.findMatchForeground': `${p.amber}aa`,
    'editorOverviewRuler.incomingContentForeground': `${p.blue}80`,
    'editorOverviewRuler.infoForeground': `${p.blue}aa`,
    'editorOverviewRuler.modifiedForeground': `${p.amberWarning}aa`,
    'editorOverviewRuler.rangeHighlightForeground': `${p.accent}26`,
    'editorOverviewRuler.selectionHighlightForeground': `${p.accent}26`,
    'editorOverviewRuler.warningForeground': `${p.amber}aa`,
    'editorOverviewRuler.wordHighlightForeground': `${p.accent}26`,
    'editorOverviewRuler.wordHighlightStrongForeground': `${p.accent}40`,

    'editorPane.background': p.bg,
    'editorRuler.foreground': isDark ? '#c8ccd40d' : '#383a410d',

    // Sticky Scroll
    'editorStickyScroll.background': p.bg,
    'editorStickyScroll.border': `${p.borderSubtle}60`,
    'editorStickyScroll.shadow': p.shadow,
    'editorStickyScrollHover.background': isDark ? '#353b4590' : '#eaeaea90',

    // Suggest Widget & Warnings
    'editorSuggestWidget.background': p.bgElevated,
    'editorSuggestWidget.border': p.border,
    'editorSuggestWidget.foreground': p.fg,
    'editorSuggestWidget.highlightForeground': p.accent,
    'editorSuggestWidget.selectedBackground': p.border,
    'editorUnnecessaryCode.opacity': '#00000088',
    'editorWarning.foreground': p.amber,
    'editorWhitespace.foreground': isDark ? '#4e5a5f80' : '#b4b4bb80',
    'editorWidget.background': p.bgElevated,
    'editorWidget.border': p.border,
    'editorWidget.foreground': p.fg,
    'errorForeground': p.red,

    // Extension Views
    'extensionBadge.remoteBackground': p.accent,
    'extensionBadge.remoteForeground': isDark ? '#1e2227' : '#ffffff',
    'extensionButton.prominentBackground': p.accent,
    'extensionButton.prominentForeground': isDark ? '#1e2227' : '#ffffff',
    'extensionButton.prominentHoverBackground': p.accentHover,
    'extensionIcon.starForeground': p.amber,
    'extensionIcon.verifiedForeground': p.accent,

    // Focus & Global Foreground
    'focusBorder': p.accent,
    'foreground': p.fg,

    // Git Decorations
    'gitDecoration.addedResourceForeground': p.greenAdded,
    'gitDecoration.conflictingResourceForeground': p.amber,
    'gitDecoration.deletedResourceForeground': p.redDeleted,
    'gitDecoration.ignoredResourceForeground': p.fgDim,
    'gitDecoration.modifiedResourceForeground': p.amberWarning,
    'gitDecoration.submoduleResourceForeground': p.cyan,
    'gitDecoration.untrackedResourceForeground': p.green,

    // Icons & Inputs
    'icon.foreground': p.fgDim,
    'input.background': p.bgInput,
    'input.border': p.border,
    'input.foreground': p.fgBright,
    'input.placeholderForeground': p.fgDim,
    'inputOption.activeBackground': p.accentMedium,
    'inputOption.activeBorder': p.accent,
    'inputOption.activeForeground': p.fgBright,
    'inputValidation.errorBackground': p.bgElevated,
    'inputValidation.errorBorder': p.red,
    'inputValidation.infoBackground': p.bgElevated,
    'inputValidation.infoBorder': p.accent,
    'inputValidation.warningBackground': p.bgElevated,
    'inputValidation.warningBorder': p.amber,

    // Keybindings & Lists
    'keybindingLabel.background': p.bgSubtle,
    'keybindingLabel.border': p.border,
    'keybindingLabel.bottomBorder': p.borderStrong,
    'keybindingLabel.foreground': p.fgBright,
    'keybindingTable.headerBackground': p.bgSubtle,
    'keybindingTable.rowsBackground': p.bg,
    'list.activeSelectionBackground': isDark ? '#454a56' : '#dfdfe0',
    'list.activeSelectionForeground': p.fgBright,
    'list.dropBackground': `${p.accent}26`,
    'list.focusBackground': isDark ? '#454a56' : '#dfdfe0',
    'list.focusForeground': p.fgBright,
    'list.focusHighlightForeground': p.accent,
    'list.focusOutline': p.accent,
    'list.highlightForeground': p.accent,
    'list.hoverBackground': p.bgSubtle,
    'list.hoverForeground': p.fgBright,
    'list.inactiveSelectionBackground': p.bgSubtle,
    'list.inactiveSelectionForeground': p.fgBright,
    'listFilterWidget.background': p.bgElevated,
    'listFilterWidget.noMatchesOutline': p.red,
    'listFilterWidget.outline': p.accent,

    // Menus
    'menu.background': p.bgElevated,
    'menu.border': p.border,
    'menu.foreground': p.fg,
    'menu.selectionBackground': p.border,
    'menu.selectionBorder': '#00000000',
    'menu.selectionForeground': p.fgBright,
    'menu.separatorBackground': p.borderSubtle,
    'menubar.selectionBackground': p.border,
    'menubar.selectionBorder': '#00000000',
    'menubar.selectionForeground': p.fgBright,

    // Minimap
    'minimap.background': p.bg,
    'minimap.errorHighlight': `${p.red}aa`,
    'minimap.findMatchHighlight': `${p.amber}aa`,
    'minimap.selectionHighlight': `${p.accent}aa`,
    'minimap.warningHighlight': `${p.amber}aa`,
    'minimapGutter.addedBackground': p.greenAdded,
    'minimapGutter.deletedBackground': p.redDeleted,
    'minimapGutter.modifiedBackground': p.amberWarning,
    'minimapSlider.activeBackground': `${p.fgDim}66`,
    'minimapSlider.background': `${p.fgDim}26`,
    'minimapSlider.hoverBackground': `${p.fgDim}44`,

    // Notebooks
    'notebook.cellBorderColor': p.borderSubtle,
    'notebook.cellEditorBackground': p.bgElevated,
    'notebook.cellHoverStatsAddressBackground': p.bgSubtle,
    'notebook.editorBackground': p.bg,
    'notebook.focusedCellBorder': p.accent,
    'notebook.focusedEditorBorder': p.accent,
    'notebookScrollbarSlider.background': `${p.borderStrong}80`,
    'notebookStatusErrorIcon.foreground': p.red,
    'notebookStatusRunningIcon.foreground': p.accent,
    'notebookStatusSuccessIcon.foreground': p.green,

    // Notifications
    'notificationCenter.border': p.border,
    'notificationCenterHeader.background': p.bgElevated,
    'notificationLink.foreground': p.accent,
    'notificationToast.border': p.border,
    'notifications.background': p.bgElevated,
    'notifications.border': p.border,
    'notificationsErrorIcon.foreground': p.red,
    'notificationsInfoIcon.foreground': p.blue,
    'notificationsWarningIcon.foreground': p.amber,

    // Panels
    'panel.background': p.bgSubtle,
    'panel.border': p.border,
    'panel.dropBorder': p.accent,
    'panelInput.border': p.border,
    'panelSection.border': p.borderSubtle,
    'panelSectionHeader.background': p.bgElevated,
    'panelTitle.activeBorder': p.accent,
    'panelTitle.activeForeground': p.fgBright,
    'panelTitle.inactiveForeground': p.fgDim,

    // Peek View
    'peekView.border': p.accent,
    'peekViewEditor.background': p.bgInput,
    'peekViewResult.background': p.bgElevated,
    'peekViewResult.fileForeground': p.fgBright,
    'peekViewResult.lineForeground': p.fgDim,
    'peekViewResult.matchHighlightBackground': `${p.amber}40`,
    'peekViewResult.selectionBackground': p.border,
    'peekViewResult.selectionForeground': p.fgBright,
    'peekViewTitle.background': p.bgElevated,
    'peekViewTitleDescription.foreground': p.fgDim,

    // Picker & Ports
    'pickerGroup.border': p.border,
    'pickerGroup.foreground': p.accent,
    'ports.iconRunningProcessForeground': p.green,
    'problemsErrorIcon.foreground': p.red,
    'problemsInfoIcon.foreground': p.blue,
    'problemsWarningIcon.foreground': p.amber,
    'progressBar.background': p.accent,

    // Quick Input
    'quickInput.background': p.bgElevated,
    'quickInput.foreground': p.fgBright,
    'quickInputList.focusBackground': p.border,
    'quickInputList.focusForeground': p.fgBright,

    // Sash & Scrollbars
    'sash.hoverBorder': p.accent,
    'scrollbar.shadow': p.shadow,
    'scrollbarSlider.activeBackground': isDark ? '#6b768c99' : '#70737a65',
    'scrollbarSlider.background': isDark ? '#4e566650' : '#70737a28',
    'scrollbarSlider.hoverBackground': isDark ? '#5a637575' : '#70737a45',

    // Search Editor
    'searchEditor.findMatchBackground': `${p.amber}40`,
    'searchEditor.findMatchBorder': '#00000000',
    'selection.background': p.selection,
    'settings.dropdownBackground': p.bg,
    'settings.dropdownBorder': p.border,
    'settings.headerForeground': p.fgBright,
    'settings.modifiedItemIndicator': p.amber,

    // Sidebar
    'sideBar.background': p.bgSubtle,
    'sideBar.border': p.border,
    'sideBar.dropBackground': `${p.accent}26`,
    'sideBar.foreground': p.fg,
    'sideBarSectionHeader.background': p.bgSubtle,
    'sideBarSectionHeader.border': p.border,
    'sideBarSectionHeader.foreground': p.fgBright,
    'sideBarTitle.foreground': p.fgBright,

    // Status Bar
    'statusBar.background': p.bgChrome,
    'statusBar.border': p.border,
    'statusBar.debuggingBackground': p.orange,
    'statusBar.debuggingForeground': isDark ? '#1e2227' : '#ffffff',
    'statusBar.foreground': p.fgBright,
    'statusBar.noFolderBackground': p.bgElevated,
    'statusBar.noFolderForeground': p.fgDim,
    'statusBarItem.activeBackground': p.border,
    'statusBarItem.errorBackground': p.red,
    'statusBarItem.errorForeground': '#ffffff',
    'statusBarItem.hoverBackground': p.bgSubtle,
    'statusBarItem.prominentBackground': p.bgSubtle,
    'statusBarItem.prominentHoverBackground': p.border,
    'statusBarItem.remoteBackground': p.accent,
    'statusBarItem.remoteForeground': isDark ? '#1e2227' : '#ffffff',
    'statusBarItem.warningBackground': p.amber,
    'statusBarItem.warningForeground': isDark ? '#1e2227' : '#ffffff',

    // Symbol Icons
    'symbolIcon.arrayForeground': p.fg,
    'symbolIcon.booleanForeground': p.orange,
    'symbolIcon.classForeground': p.amber,
    'symbolIcon.colorForeground': p.orange,
    'symbolIcon.constantForeground': p.amber,
    'symbolIcon.constructorForeground': p.blue,
    'symbolIcon.enumeratorForeground': p.amber,
    'symbolIcon.enumeratorMemberForeground': p.fg,
    'symbolIcon.eventForeground': p.blue,
    'symbolIcon.fieldForeground': p.fg,
    'symbolIcon.fileForeground': p.fg,
    'symbolIcon.folderForeground': p.fg,
    'symbolIcon.functionForeground': p.blue,
    'symbolIcon.interfaceForeground': p.amber,
    'symbolIcon.keyForeground': p.green,
    'symbolIcon.keywordForeground': p.purple,
    'symbolIcon.methodForeground': p.blue,
    'symbolIcon.moduleForeground': p.purple,
    'symbolIcon.namespaceForeground': p.purple,
    'symbolIcon.nullForeground': p.orange,
    'symbolIcon.numberForeground': p.orange,
    'symbolIcon.objectForeground': p.amber,
    'symbolIcon.operatorForeground': p.purple,
    'symbolIcon.packageForeground': p.purple,
    'symbolIcon.propertyForeground': p.amber,
    'symbolIcon.referenceForeground': p.fg,
    'symbolIcon.snippetForeground': p.green,
    'symbolIcon.stringForeground': p.green,
    'symbolIcon.structForeground': p.amber,
    'symbolIcon.textForeground': p.fg,
    'symbolIcon.typeParameterForeground': p.amber,
    'symbolIcon.unitForeground': p.orange,
    'symbolIcon.variableForeground': p.fg,

    // Tabs
    'tab.activeBackground': p.bg,
    'tab.activeBorder': '#00000000',
    'tab.activeBorderTop': '#00000000',
    'tab.activeForeground': p.fgBright,
    'tab.activeModifiedBorder': p.amber,
    'tab.border': p.border,
    'tab.hoverBackground': p.border,
    'tab.hoverBorder': '#00000000',
    'tab.hoverForeground': p.fgBright,
    'tab.inactiveBackground': p.bgSubtle,
    'tab.inactiveForeground': p.fgDim,
    'tab.inactiveModifiedBorder': `${p.amber}80`,
    'tab.lastPinnedBorder': p.border,
    'tab.selectedBackground': isDark ? '#353b4590' : '#eaeaea90',
    'tab.selectedForeground': p.fgBright,
    'tab.unfocusedActiveBorder': '#00000000',
    'tab.unfocusedActiveBorderTop': '#00000000',
    'tab.unfocusedHoverBackground': p.lineHighlight,
    'tab.unfocusedHoverForeground': p.fgBright,

    // Terminal
    'terminal.ansiBlack': isDark ? '#282c34' : '#000000',
    'terminal.ansiBlue': p.blue,
    'terminal.ansiBrightBlack': isDark ? '#636d83' : '#555555',
    'terminal.ansiBrightBlue': p.accentHover,
    'terminal.ansiBrightCyan': p.cyan,
    'terminal.ansiBrightGreen': p.green,
    'terminal.ansiBrightMagenta': p.purple,
    'terminal.ansiBrightRed': p.red,
    'terminal.ansiBrightWhite': '#ffffff',
    'terminal.ansiBrightYellow': p.amber,
    'terminal.ansiCyan': p.cyan,
    'terminal.ansiGreen': p.green,
    'terminal.ansiMagenta': p.purple,
    'terminal.ansiRed': p.red,
    'terminal.ansiWhite': isDark ? '#abb2bf' : '#bbbbbb',
    'terminal.ansiYellow': p.amber,
    'terminal.background': p.bg,
    'terminal.border': p.border,
    'terminal.foreground': p.fg,
    'terminalCommandDecoration.defaultBackground': p.fgDim,
    'terminalCommandDecoration.errorBackground': p.red,
    'terminalCommandDecoration.successBackground': p.green,
    'terminalCursor.foreground': p.accent,

    // Testing
    'testing.iconFailed': p.red,
    'testing.iconPassed': p.green,
    'testing.iconQueued': p.amber,
    'testing.iconSkipped': `${p.fgDim}80`,
    'testing.iconUnset': `${p.fgDim}80`,
    'testing.runAction': p.green,

    // Text & Prose
    'textBlockQuote.background': p.bgElevated,
    'textBlockQuote.border': p.accent,
    'textCodeBlock.background': p.bgElevated,
    'textLink.activeForeground': p.accent,
    'textLink.foreground': p.accent,
    'textPreformat.foreground': p.fg,
    'textSeparator.foreground': p.border,

    // Titlebar
    'titleBar.activeBackground': p.bgChrome,
    'titleBar.activeForeground': p.fgBright,
    'titleBar.border': p.border,
    'titleBar.inactiveBackground': p.bgSubtle,
    'titleBar.inactiveForeground': p.fgDim,

    // Tree & Widgets
    'toolbar.hoverBackground': p.border,
    'tree.inactiveIndentGuidesStroke': isDark ? '#c8ccd426' : '#383a4126',
    'tree.indentGuidesStroke': isDark ? '#c8ccd450' : '#383a4150',
    'walkThrough.embeddedEditorBackground': p.bgElevated,
    'welcomePage.buttonBackground': p.bgElevated,
    'welcomePage.buttonHoverBackground': p.border,
    'widget.border': p.border,
    'widget.shadow': p.shadow,
    'window.activeBorder': '#00000000',
    'window.inactiveBorder': '#00000000'
  };

  const tokenColors = [
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: p.fgMuted,
        fontStyle: 'italic'
      }
    },
    {
      name: 'Doc Comments',
      scope: ['comment.block.documentation', 'comment.block.javadoc'],
      settings: {
        foreground: p.fgMuted,
        fontStyle: 'italic'
      }
    },
    {
      name: 'Keywords',
      scope: [
        'keyword',
        'keyword.control',
        'keyword.control.flow',
        'keyword.control.import',
        'keyword.control.export',
        'keyword.control.from',
        'keyword.control.conditional',
        'keyword.control.loop',
        'keyword.control.trycatch',
        'keyword.operator.new',
        'keyword.operator.expression'
      ],
      settings: {
        foreground: p.purple
      }
    },
    {
      name: 'Storage',
      scope: [
        'storage',
        'storage.type',
        'storage.modifier',
        'storage.type.function',
        'storage.type.class',
        'storage.type.interface',
        'storage.type.enum',
        'storage.type.type'
      ],
      settings: {
        foreground: p.purple
      }
    },
    {
      name: 'Functions and Methods',
      scope: [
        'entity.name.function',
        'meta.function-call entity.name.function',
        'support.function',
        'meta.function-call'
      ],
      settings: {
        foreground: p.blue
      }
    },
    {
      name: 'Function Parameters',
      scope: ['variable.parameter', 'meta.parameter'],
      settings: {
        foreground: p.red
      }
    },
    {
      name: 'Types, Classes and Interfaces',
      scope: [
        'entity.name.type',
        'entity.name.type.class',
        'entity.name.type.interface',
        'entity.name.type.enum',
        'entity.name.type.struct',
        'entity.name.type.type',
        'support.type',
        'support.class',
        'entity.other.inherited-class'
      ],
      settings: {
        foreground: p.cyan
      }
    },
    {
      name: 'Strings',
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'string.quoted.single',
        'string.quoted.double',
        'string.quoted.triple'
      ],
      settings: {
        foreground: p.green
      }
    },
    {
      name: 'String Interpolation',
      scope: [
        'punctuation.definition.template-expression.begin',
        'punctuation.definition.template-expression.end',
        'punctuation.section.embedded'
      ],
      settings: {
        foreground: p.purple
      }
    },
    {
      name: 'Numbers',
      scope: [
        'constant.numeric',
        'constant.numeric.integer',
        'constant.numeric.float',
        'constant.numeric.hex',
        'constant.numeric.octal',
        'constant.numeric.binary'
      ],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'Booleans and Built-in Constants',
      scope: [
        'constant.language',
        'constant.language.boolean',
        'constant.language.null',
        'constant.language.undefined'
      ],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'Constants',
      scope: [
        'variable.other.constant',
        'variable.other.enummember',
        'constant.other'
      ],
      settings: {
        foreground: p.amber
      }
    },
    {
      name: 'Variables',
      scope: [
        'variable',
        'variable.other',
        'variable.other.readwrite',
        'variable.other.object'
      ],
      settings: {
        foreground: p.fg
      }
    },
    {
      name: 'Special Language Variables (this, self, super)',
      scope: [
        'variable.language',
        'variable.language.this',
        'variable.language.self',
        'variable.language.super'
      ],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'Properties and Object Keys',
      scope: [
        'variable.other.property',
        'variable.other.object.property',
        'support.type.property-name',
        'meta.object-literal.key',
        'meta.property-name'
      ],
      settings: {
        foreground: p.red
      }
    },
    {
      name: 'JSON Keys',
      scope: [
        'source.json support.type.property-name.json',
        'meta.structure.dictionary.json string.quoted.double.json'
      ],
      settings: {
        foreground: p.blue
      }
    },
    {
      name: 'YAML Keys',
      scope: ['entity.name.tag.yaml'],
      settings: {
        foreground: p.blue
      }
    },
    {
      name: 'Operators',
      scope: [
        'keyword.operator',
        'keyword.operator.assignment',
        'keyword.operator.arithmetic',
        'keyword.operator.comparison',
        'keyword.operator.logical'
      ],
      settings: {
        foreground: p.cyan
      }
    },
    {
      name: 'Punctuation and Delimiters',
      scope: [
        'punctuation',
        'punctuation.separator',
        'punctuation.terminator',
        'meta.brace',
        'meta.bracket'
      ],
      settings: {
        foreground: isDark ? '#abb2bf' : '#4d4f52'
      }
    },
    {
      name: 'HTML/JSX/XML Tags',
      scope: ['entity.name.tag', 'meta.tag'],
      settings: {
        foreground: p.blue
      }
    },
    {
      name: 'Tag Attributes',
      scope: [
        'entity.other.attribute-name',
        'entity.other.attribute-name.jsx',
        'entity.other.attribute-name.html'
      ],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'Regexp and Escape Sequences',
      scope: ['string.regexp', 'constant.character.escape'],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'Decorators and Annotations',
      scope: ['meta.decorator', 'meta.annotation', 'punctuation.decorator'],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'CSS/SCSS Selectors and Classes',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.other.attribute-name.pseudo-class.css'
      ],
      settings: {
        foreground: p.green
      }
    },
    {
      name: 'CSS Property Names',
      scope: ['support.type.property-name.css', 'support.type.property-name.media'],
      settings: {
        foreground: p.blue
      }
    },
    {
      name: 'CSS Custom Properties / Variables',
      scope: [
        'variable.css',
        'variable.argument.css',
        'meta.property-value.css support.type.custom-property.name'
      ],
      settings: {
        foreground: p.cyan
      }
    },
    {
      name: 'CSS Property Values and Constants',
      scope: ['support.constant.property-value.css', 'meta.property-value.css'],
      settings: {
        foreground: p.orange
      }
    },
    {
      name: 'CSS Units',
      scope: ['keyword.other.unit.css'],
      settings: {
        foreground: p.amber
      }
    },
    {
      name: 'Markdown Headings',
      scope: ['markup.heading', 'entity.name.section.markdown'],
      settings: {
        foreground: p.blue,
        fontStyle: 'bold'
      }
    },
    {
      name: 'Markdown Bold',
      scope: 'markup.bold',
      settings: {
        foreground: p.orange,
        fontStyle: 'bold'
      }
    },
    {
      name: 'Markdown Italic',
      scope: 'markup.italic',
      settings: {
        foreground: p.purple,
        fontStyle: 'italic'
      }
    },
    {
      name: 'Markdown Code',
      scope: ['markup.inline.raw', 'markup.raw.block'],
      settings: {
        foreground: p.green
      }
    },
    {
      name: 'Markdown Blockquotes',
      scope: ['markup.quote', 'punctuation.definition.quote.begin.markdown'],
      settings: {
        foreground: p.fgMuted,
        fontStyle: 'italic'
      }
    },
    {
      name: 'Markdown Lists',
      scope: [
        'markup.list.unnumbered',
        'markup.list.numbered',
        'punctuation.definition.list.begin.markdown'
      ],
      settings: {
        foreground: p.cyan
      }
    },
    {
      name: 'Markdown Links',
      scope: ['string.other.link', 'markup.underline.link'],
      settings: {
        foreground: p.blue,
        fontStyle: 'underline'
      }
    },
    {
      name: 'Shell Variables and Commands',
      scope: [
        'variable.other.readwrite.shell',
        'variable.other.normal.shell',
        'meta.command-expansion',
        'string.interpolated.dollar.shell'
      ],
      settings: {
        foreground: p.cyan
      }
    }
  ];

  return {
    name: p.name,
    type: p.type,
    semanticHighlighting: true,
    semanticTokenColors,
    colors,
    tokenColors
  };
}

// Write the 4 themes
const targets = [
  { key: 'light', file: 'zed-light.json' },
  { key: 'dark', file: 'zed-dark.json' },
  { key: 'oled', file: 'zed-oled.json' },
  { key: 'mirage', file: 'zed-mirage.json' }
];

targets.forEach(({ key, file }) => {
  const data = generateTheme(palettes[key]);
  const filePath = path.join(themesDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Generated ${file}: ${Object.keys(data.colors).length} colors, ${data.tokenColors.length} token rules`);
});

console.log('All Zed themes generated successfully!');
