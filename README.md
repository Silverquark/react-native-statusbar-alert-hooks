# React Native Statusbar Alert

A status bar alert (e.g. in-call, recording, navigating) for React Native

## Install

`npm install react-native-statusbar-alert --save` or `yarn add react-native-statusbar-alert`

## Usage

### Basic

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
/>
```

![basic](screenshots/react-native-statusbar-alert.mov.gif)

### Pulse

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
  pulse="background"
/>
```

![pulse](screenshots/react-native-statusbar-alert-pulse.mov.gif)

### Press

```js
<StatusBarAlert
  visible={true}
  message="Silent Switch ON"
  backgroundColor="#3CC29E"
  color="white"
  onPress={() => this.navigator.push({id: 'SilentAlert'})}
/>
```

### Children

```js
<StatusBarAlert
  visible={true}
  height={68}
  style={{
    padding: 5
  }}
>
  <Image
    style={{ width: 66, height: 58 }}
    source={{
      uri: 'https://facebook.github.io/react-native/img/header_logo.png'
    }}
  />
</StatusBarAlert>
```

## Props

| Name            | Description                     | Required    | Type                      | Default
| :-------------  | :------------------------------ | :---------- | :------------------------ | :------
| visible         | `true` to show, `false` to hide | true        | bool                      | `false`
| message         | message to display in alert     | true        | string                    | `''`
| onPress         | callback on press event         | false       | func                      | `null`
| pulse           | animate the text or background  | false       | enum('text','background') | `false`
| backgroundColor | background color                | false       | [color][1]                | `'#3DD84C'`
| highlightColor  | color on press and pulse        | false       | [color][1]                | `darken(this.props.backgroundColor, 0.9)`
| color           | text color                      | false       | [color][1]                | `'white'`
| height          | height of children container    | false       | int                       | 20
| statusbarHeight | [custom status bar height][2]   | false       | int                       | 20
| style           | styles for children container   | false       | [style object][3]         | `{}`

[1]: https://facebook.github.io/react-native/docs/colors.html  "React Native Colors"
[2]: https://github.com/brentvatne/react-native-status-bar-size "react-native-status-bar-size"
[3]: https://facebook.github.io/react-native/docs/style.html  "React Native Style"

## Usage with react-navigation

See the [example](/example) directory for a complete example.

## Example app

See the [ReactNativeStatusBarAlertExample](https://github.com/plamworapot/react-native-statusbar-alert-hooks/tree/master/example) directory for an example React Native app using react-native-statusbar-alert-hooks.
