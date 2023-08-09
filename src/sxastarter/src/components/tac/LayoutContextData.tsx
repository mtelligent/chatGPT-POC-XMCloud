import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithContextProps } from 'lib/component-props';

const LayoutContextData = (props: ComponentWithContextProps): JSX.Element => {
  const sitecoreContext = props.sitecoreContext;
  const id = props.params?.RenderingIdentifier;

  return (
    <div
      className={`component layout-context-data ${props.params?.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <div>
          <h2>Layout Context Data</h2>
          <ul>
            <li>Language:{sitecoreContext.language}</li>
            <li>Page Editing:{sitecoreContext.pageEditing?.toString()}</li>
            <li>Page State:{sitecoreContext.pageState}</li>
            <li>Site:{sitecoreContext.site?.name}</li>
          </ul>
          <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
            {JSON.stringify(sitecoreContext, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const Default = withSitecoreContext()(LayoutContextData);
