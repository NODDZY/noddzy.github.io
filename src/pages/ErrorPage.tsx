import { useRouteError, ErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as ErrorResponse).statusText || (error as Error).message}</i>
      </p>
    </div>
  );
}
