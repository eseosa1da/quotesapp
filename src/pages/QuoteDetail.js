import { useEffect } from "react";
import {
  useParams,
  Route,
  Link,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();

  const location = useLocation();

  const match = useRouteMatch();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: quoteDetail,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!quoteDetail.text || !quoteDetail.author)) {
    return <h1>No Quote Detail!</h1>;
  }

  const isCommentsShown = location.pathname === `${match.path}/comments`;

  //   const quote = quoteDetail.find((item) => item.id === params.quoteId);

  //   if (!quote) {
  //     return <h1>No quote found!</h1>;
  //   }

  return (
    <section>
      <HighlightedQuote text={quoteDetail.text} author={quoteDetail.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link
            className="btn--flat"
            to={!isCommentsShown ? `${match.url}/comments` : match.url}
          >
            {" "}
            {!isCommentsShown ? "Load" : "Hide"} Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`} exact>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
