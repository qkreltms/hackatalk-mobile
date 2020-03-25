import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import React, { ReactElement } from 'react';
import Friend from '../../screen/Friend';
import { QUERY_FRIENDS } from '../../../graphql/queries';
import { createTestElement } from '../../../../test/testUtils';
import { render } from '@testing-library/react-native';

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

  it('Render without crashing', () => {
    const component = render(setup());
    expect(component).toMatchSnapshot();
  });

  /*
  it('Delete existing user', () => {
    const mocks = [
      {
        request: {
          query: MUTATION_DELETE_FRIEND,
          variables: {
            id: 'aa11',
          },
        },
        result: {
          data: {
            id: 'aa11',
          },
        },
      },
    ];

    const component = render(setup(mocks));
    const friend = component.getByTestId('user-id-0');
    fireEvent.press(friend);

    // TODO: find profileModal's delete button and press it.
    // const profileModalButton = profileModal.getByTestId('btn-ad-friend');
    // fireEvent.press(friendModalButton);

    // TODO: Check whether it deleted from View.
  });
  */

  // it("Delete not existing user", () => {})
  // it("Delete a friend and check error state")
});
