---
slug: packs/design-pack/guides/user-experience/move-dom-element-without-losing-state
type: spec
title: "move dom element without losing state"
description: "When reparenting DOM elements using traditional methods like appendChild() or insertBefore(), the browser implicitly removes the element from the DOM and then inserts it into its…"
title_zh: "移动 DOM 元素而不丢失状态"
description_zh: "使用 appendChild() 或 insertBefore() 等传统方法重新指定 DOM 元素的父节点时，浏览器会隐式地将元素从 DOM 中移除，然后再插入到其新位置……"
tags: [user-experience, guide, modern-web]
category: user-experience
---

When reparenting DOM elements using traditional methods like `appendChild()` or `insertBefore()`, the browser implicitly removes the element from the DOM and then inserts it into its new location. This "remove and insert" operation resets many internal states, causing `<iframe>` elements to reload, CSS animations to restart, and input fields to lose focus.

To move an element while preserving its state, use the `moveBefore()` API. This method performs an atomic move, completely bypassing the removal and insertion steps.

### Moving an element with state

Use `moveBefore()` exactly as you would use `insertBefore()`. It requires two arguments: the node to move, and a reference node to insert before (or `null` to append to the end of the new parent).

```javascript
const newParent = document.getElementById('new-parent');
const elementWithState = document.getElementById('iframe-or-focused-input');

// MANDATORY: Use moveBefore to preserve state. 
// Passing null as the second argument appends the element to the end of newParent.
newParent.moveBefore(elementWithState, null);
```

### Moving custom elements (Web Components)

If you are moving custom elements using `moveBefore()`, their `connectedCallback` and `disconnectedCallback` lifecycle methods will **not** be fired.

If your custom element needs to perform specific logic when moved, implement the `connectedMoveCallback()` method inside the custom element definition.

```javascript
class MyCustomElement extends HTMLElement {
  connectedCallback() {
    // Runs on initial insertion.
  }
  
  connectedMoveCallback() {
    // Runs when the element is moved via moveBefore().
    // Use this to update state that depends on the new DOM location.
  }
}
```

### Fallback strategies

moveBefore() has limited availability.
Supported by: Chrome 133 (Feb 2025), Edge 133 (Feb 2025), and Firefox 144 (Oct 2025).
Unsupported in: Safari.

Since `moveBefore()` is a progressive enhancement, you MUST use feature detection before calling it, falling back to traditional `insertBefore()` or `appendChild()` operations for older browsers. 

```javascript
const targetParent = document.getElementById('target-container');
const nodeToMove = document.getElementById('moving-element');

// Check if moveBefore is supported on the Element prototype
if ('moveBefore' in Element.prototype) {
  targetParent.moveBefore(nodeToMove, null);
} else {
  // Fallback: traditional move. 
  // Note: This WILL reset <iframe>, animation, and focus state in unsupported browsers.
  targetParent.insertBefore(nodeToMove, null);
}
```