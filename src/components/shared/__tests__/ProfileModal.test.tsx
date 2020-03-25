import ProfileModal, { Ref } from '../ProfileModal';
import React, { ReactElement, createRef } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { MUTATION_DELETE_FRIEND } from '../../../graphql/mutations';
import { MockedProvider } from '@apollo/react-testing';
import { createTestElement } from '../../../../test/testUtils';

describe('[ProfileModal] rendering test', () => {
  const ref = createRef<Ref>();
  const setup = (mocks?): ReactElement =>
    createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileModal ref={ref} />
      </MockedProvider>);

  it('Render without crashing', () => {
    const component = render(setup());
    expect(component).toMatchSnapshot();
  });

  it('Ref must not be null', () => {
    expect(ref.current).not.toBeNull();
  });

  it('Open', () => {
    const component = render(setup());
    ref.current.open();
    expect(component.getByTestId('btn-ad-friend')).not.toBeNull();
  });

  it('Close', () => {
    const component = render(setup());
    ref.current.close();
    // Expects dom is null
    expect(component.queryByTestId('btn-ad-friend')).toBeNull();
  });

  it('Delete existing user', () => {
    // TODO: 1. Add a friend
    // 2. Delete a friend
    const mocks = [
      {
        request: {
          query: MUTATION_DELETE_FRIEND,
          variables: {
            id: '8b3ee240-5545-11ea-9ea9-ad4e7fcc8ca2',
          },
        },
        result: {
          data: {
            id: '8b3ee240-5545-11ea-9ea9-ad4e7fcc8ca2',
          },
        },
      },
    ];

    const component = render(setup(mocks));
    ref.current.open();
    const button = component.getByTestId('btn-ad-friend');
    fireEvent.press(button);

    // TODO: 3. Check whether it deleted from View.
  });

  // it("Delete not existing user", () => {})
  // it("Delete a friend and check error state")
});
