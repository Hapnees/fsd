export const componentUITemplate = componentName => `import { FC } from 'react';
import styles './${componentName}.module.scss';

interface I${componentName}Props {};

export const ${componentName}: FC<I${componentName}Props> = () => {
  return <div></div>;
};
`
