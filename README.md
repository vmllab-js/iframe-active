# iframe-active
Track the active state of iframes in a html page.

## Methods
| Method | Description |
|:-------------:|:-------------|
| track | track the actice state of an iframe element |
| destroy | when the tracks is no longer useful, just destroy them |

## Examples
```js
var iFrameActive = new IFrameActive();
iFrameActive.track(document.getElementById('iframeA'), function (activeState, activeCount) {
	console.log(activeState, activeCount);
});
iFrameActive.track(document.getElementById('iframeB'), function (activeState, activeCount) {
	console.log(activeState, activeCount);
});
```
