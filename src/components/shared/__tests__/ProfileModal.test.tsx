import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import React, { ReactElement } from 'react';
import { render, wait } from '@testing-library/react-native';
import Friend from '../../screen/Friend';
import { QUERY_FRIENDS } from '../../../graphql/queries';
import { createTestElement } from '../../../../test/testUtils';

describe('[ProfileModal] rendering test', () => {
  const setup = (mocks?: Array<MockedResponse>): ReactElement => {
    // Insert mock at index of 0
    mocks && mocks.unshift({
      request: {
        query: QUERY_FRIENDS,
      },
      result: {
        data: {
          friends: [{
            id: 'aa11',
            photoURL: '',
            name: 'testName',
          }],
        },
      },
    });

    return createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Friend />
      </MockedProvider>);
  };

  it('Render without crashing', async () => {
    await wait(() => {
      const component = render(setup());
      expect(component).toMatchSnapshot();
    });
  });
});
