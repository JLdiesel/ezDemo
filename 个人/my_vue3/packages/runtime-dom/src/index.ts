import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

import { createRenderer } from '@vue/runtime-core';
const renderOptions = Object.assign({ patchProp }, nodeOps)
//createRenderer
// createRenderer(renderOptions).render(h('h1', 'hello'), document.getElementById('app'))
export const render = createRenderer(renderOptions).render
export * from '@vue/runtime-core'
export * from '@vue/reactivity'