/**
 *
 * Stories for DetailCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import DetailCard from '../index';

storiesOf('DetailCard').add('simple', () => <DetailCard id={text('id', 'DetailCard')} />);
