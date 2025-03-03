import InboxScreen from './InboxScreen';

import store from '../lib/store';
import { http, HttpResponse } from 'msw';
import { MockState } from './TaskList.stories';
import { Provider } from 'react-redux';

// import {
//   fireEvent,
//   within,
//   waitFor,
//   waitForElementToBeRemoved
//  } from '@storybook/testing-library';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1',
          () => {
            return HttpResponse.json(MockState.tasks);
          }
        ),
      ],
    },
  },
//  play: async ({ canvasElement }) => {
//    const canvas = within(canvasElement);
//    // Waits for the component to transition from the loading state
//    await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
//    // Waits for the component to be updated based on the store
//    await waitFor(async () => {
//      // Simulates pinning the first task
//      await fireEvent.click(canvas.getByLabelText('Task 1'));
//      // Simulates pinning the third task
//      await fireEvent.click(canvas.getByLabelText('Task 3'));
//    });
//  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1',
          (req, res, ctx) => {
            return HttpResponse.json(ctx.status(403));
          }
        ),
      ],
    },
  },
};