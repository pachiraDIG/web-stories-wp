/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { renderWithTheme } from '../../../../../testUtils';
import formattedUsersObject from '../../../../../storybookUtils/formattedUsersObject';

import { VIEW_STYLE, STORY_STATUSES } from '../../../../../constants';
import LayoutProvider from '../../../../../components/layout/provider';
import Content from '../';

const fakeStories = [
  {
    id: 1,
    status: 'publish',
    title: 'Story A',
    pages: [{ id: '10' }],
    centerTargetAction: () => {},
    bottomTargetAction: () => {},
  },
  {
    id: 2,
    status: 'draft',
    title: 'Story B',
    pages: [{ id: '20' }],
    centerTargetAction: () => {},
    bottomTargetAction: () => {},
  },
  {
    id: 3,
    status: 'publish',
    title: 'Story C',
    pages: [{ id: '30' }],
    centerTargetAction: () => {},
    bottomTargetAction: () => {},
  },
];

jest.mock('../../../../../components/previewPage.js', () => () => null);
jest.mock('../../../../../app/font/fontProvider.js', () => ({ children }) =>
  children
);

describe('My Stories <Content />', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the content grid with the correct story count.', function () {
    const { getAllByTestId } = renderWithTheme(
      <LayoutProvider>
        <Content
          filter={STORY_STATUSES[0]}
          search={{ keyword: '' }}
          stories={fakeStories}
          users={formattedUsersObject}
          page={{
            requestNextPage: jest.fn(),
          }}
          view={{
            style: VIEW_STYLE.GRID,
            pageSize: { width: 200, height: 300 },
          }}
        />
      </LayoutProvider>
    );

    expect(getAllByTestId('grid-item')).toHaveLength(fakeStories.length);
  });
});
