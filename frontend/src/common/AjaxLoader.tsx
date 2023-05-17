export const AjaxLoader = (props: { isAjax: boolean; children: any }) => {
  const { children, isAjax } = props;

  return isAjax ? (
    <div className="ajax-loader">
      <div className="loader"></div>
    </div>
  ) : (
    <>{children}</>
  );
};
