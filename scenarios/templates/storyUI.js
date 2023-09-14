export const storyUITemplate =
  componentName => `import { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '.';

const meta: Meta = {
  title: '${componentName}',
  component: ${componentName},
};

type Story = StoryObj<typeof ${componentName}>;

export const Primary: Story = {};

export default meta;
`
