import { createMuiTheme } from '@material-ui/core';
// tslint:disable-next-line
import { createShallow } from '@material-ui/core/test-utils';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import * as React from 'react';
import AudioVolumeControl from './AudioVolumeControl';
import PLAYER from './state/player';
import { mountWithTheme } from './utils/enzymeHelpers';

describe('AudioVolumeControl component', () => {
  const mainColor = 'green';
  const muiTheme = createMuiTheme({});
  const muiShallow = createShallow({ untilSelector: 'AudioVolumeControl' });
  it('renders', () => {
    const muteAudio = jest.fn();
    const unmuteAudio = jest.fn();
    const changeAudioVolume = jest.fn();
    const volume = {
      status: PLAYER.VOLUME.STATUS.UNMUTE,
      value: 0
    };
    const wrapper = mountWithTheme(
      <AudioVolumeControl
        volume={volume}
        muteAudio={muteAudio}
        unmuteAudio={unmuteAudio}
        changeAudioVolume={changeAudioVolume}
        mainColor={mainColor}
      />,
      muiTheme
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render VolumeUp and able to mute audio', () => {
    const muteAudio = jest.fn();
    const unmuteAudio = jest.fn();
    const changeAudioVolume = jest.fn();
    const volume = {
      status: PLAYER.VOLUME.STATUS.UNMUTE,
      value: 100
    };
    const wrapper = muiShallow(
      <AudioVolumeControl
        volume={volume}
        muteAudio={muteAudio}
        unmuteAudio={unmuteAudio}
        changeAudioVolume={changeAudioVolume}
        mainColor={mainColor}
      />
    );

    const icon = wrapper.find(VolumeUp);
    expect(icon).toHaveLength(1);
    icon.simulate('click');
    expect(muteAudio.mock.calls.length).toBe(1);
  });

  it('should render VolumeOff and able to unmute audio', () => {
    const muteAudio = jest.fn();
    const unmuteAudio = jest.fn();
    const changeAudioVolume = jest.fn();
    const volume = {
      status: PLAYER.VOLUME.STATUS.MUTE,
      value: 100
    };

    const wrapper = muiShallow(
      <AudioVolumeControl
        volume={volume}
        muteAudio={muteAudio}
        unmuteAudio={unmuteAudio}
        changeAudioVolume={changeAudioVolume}
        mainColor={mainColor}
      />
    );

    const icon = wrapper.find(VolumeOff);
    expect(icon).toHaveLength(1);
    icon.simulate('click');
    expect(unmuteAudio.mock.calls.length).toBe(1);
  });
});
