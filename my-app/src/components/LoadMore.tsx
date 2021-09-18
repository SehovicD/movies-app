import { LoadMoreButton, LoadMoreButtonWrapper } from "../styles/LoadMoreStyle";

interface LoadMoreProps {
  handleLoadMore: Function;
  loadItems: number;
}

const LoadMore = (props: LoadMoreProps) => {
  const { handleLoadMore, loadItems } = props;
  const loadMore = () => {
    handleLoadMore(true, loadItems + 10);
  };
  return (
    <LoadMoreButtonWrapper>
      <LoadMoreButton variant="contained" onClick={() => loadMore()}>
        Load more
      </LoadMoreButton>
    </LoadMoreButtonWrapper>
  );
};

export default LoadMore;
