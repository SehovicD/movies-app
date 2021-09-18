import { useEffect, useRef, useState } from "react";
import {
  CardContainer,
  CardWrapper,
  Label,
  LabelContainer,
} from "../styles/HomeStyle";
import LoadMore from "./LoadMore";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import { SEARCH_PARAMS, SWITCH_TYPE } from "../enums/enums";

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const [loadItems, setLoadItems] = useState<number>(10);
  const [switchValue, setSwitchValue] = useState<string>(SWITCH_TYPE.MOVIES);
  const [searchValue, setSearchValue] = useState<string>("");

  const timerRef: any = useRef(null);

  useEffect(() => {
    fetch("movies.json")
      .then((response: any) => {
        return response.json();
      })
      .then((data: any) => {
        data.sort((a: any, b: any) => b.rating - a.rating);
        setData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data && data.length) {
      filterData(data);
    }
  }, [data]);

  const filterData = (
    array: any,
    movie?: string,
    searchParam?: string,
    specialSearch?: string
  ) => {
    let filtered = [...array];
    if (searchParam && !specialSearch) {
      const keyword = searchParam.toLowerCase();
      filtered = filtered.filter(
        (item: any) =>
          item.title.toLowerCase().indexOf(keyword) > -1 ||
          item.genres.toLowerCase().indexOf(keyword) > -1 ||
          String(item.release_year).indexOf(keyword) > -1
      );
      return setFiltered(filtered);
    } else if (searchParam && specialSearch) {
      if (specialSearch === SEARCH_PARAMS.RATING) {
        filtered = filtered.filter(
          (item: any) => item.rating >= Number(searchParam)
        );
        return setFiltered(filtered);
      }
      if (specialSearch === SEARCH_PARAMS.OLDER) {
        const thisYear = new Date().getFullYear();
        const param = thisYear - Number(searchParam);
        filtered = filtered.filter((item: any) => item.release_year <= param);
        return setFiltered(filtered);
      }
      if (specialSearch === SEARCH_PARAMS.YOUNGER) {
        const thisYear = new Date().getFullYear();
        const param = thisYear - Number(searchParam);
        filtered = filtered.filter(
          (item: any) =>
            item.release_year >= param && item.release_year <= thisYear
        );
        return setFiltered(filtered);
      }
      if (specialSearch === SEARCH_PARAMS.AFTER) {
        filtered = filtered.filter(
          (item: any) => item.release_year >= Number(searchParam)
        );
        return setFiltered(filtered);
      }
      if (specialSearch === SEARCH_PARAMS.BEFORE) {
        filtered = filtered.filter(
          (item: any) => item.release_year <= Number(searchParam)
        );
        return setFiltered(filtered);
      }
    }
    if (movie === SWITCH_TYPE.TV_SHOWS) {
      filtered = data.filter((item: any) => !item.movie).slice(0, 10);
      return setFiltered(filtered);
    }
    filtered = data.filter((item: any) => item.movie).slice(0, 10);
    setFiltered(filtered);
  };

  const handleSwitch = (movie: boolean) => {
    if (!movie) {
      filterData(data);
      setSwitchValue(SWITCH_TYPE.MOVIES);
      setLoadItems(10);
      setSearchValue("");
    } else {
      filterData(data, SWITCH_TYPE.TV_SHOWS);
      setSwitchValue(SWITCH_TYPE.TV_SHOWS);
      setLoadItems(10);
      setSearchValue("");
    }
  };

  const handleLoadMore = (load: boolean, loadItems: number) => {
    if (load) {
      let loadMore = [];
      if (switchValue === SWITCH_TYPE.MOVIES) {
        loadMore = data.filter((item: any) => item.movie).slice(0, loadItems);
      } else {
        loadMore = data.filter((item: any) => !item.movie).slice(0, loadItems);
      }
      setLoadItems(loadItems);
      setFiltered(loadMore);
    }
  };

  const handleSearch = (newValue: string) => {
    const search = newValue ? newValue : "";
    setSearchValue(search);
    if (search.toLowerCase().includes(SEARCH_PARAMS.RATING)) {
      const arr = search.split(" ");
      const index = arr.indexOf(SEARCH_PARAMS.RATING);
      let rating = "";
      if (index !== 0) {
        rating = arr[index - 1];
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setLoadItems(10);
        filterData(data, switchValue, rating, SEARCH_PARAMS.RATING);
      }, 500);
    } else if (search.toLowerCase().includes(SEARCH_PARAMS.OLDER)) {
      const arr = search.split(" ");
      const index = arr.indexOf(SEARCH_PARAMS.YEARS);
      let year = "";
      if (index !== -1) {
        year = arr[index - 1];
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, year, SEARCH_PARAMS.OLDER);
        }, 500);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, search);
        }, 500);
      }
    } else if (search.toLowerCase().includes(SEARCH_PARAMS.YOUNGER)) {
      const arr = search.split(" ");
      const index = arr.indexOf(SEARCH_PARAMS.YEARS);
      let year = "";
      if (index !== -1) {
        year = arr[index - 1];
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, year, SEARCH_PARAMS.YOUNGER);
        }, 500);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, search);
        }, 500);
      }
    } else if (search.toLowerCase().includes(SEARCH_PARAMS.AFTER)) {
      const arr = search.split(" ");
      const index = arr.indexOf(SEARCH_PARAMS.AFTER);
      const year = arr[index + 1];
      if (year) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, year, SEARCH_PARAMS.AFTER);
        }, 500);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, search);
        }, 500);
      }
    } else if (search.toLowerCase().includes(SEARCH_PARAMS.BEFORE)) {
      const arr = search.split(" ");
      const index = arr.indexOf(SEARCH_PARAMS.BEFORE);
      const year = arr[index + 1];
      if (year) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, year, SEARCH_PARAMS.BEFORE);
        }, 500);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setLoadItems(10);
          filterData(data, switchValue, search);
        }, 500);
      }
    } else if (newValue && newValue.length > 2) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setLoadItems(10);
        filterData(data, switchValue, search);
      }, 500);
    } else if (
      ((newValue && newValue.length <= 2) || !newValue) &&
      searchValue.length > 2
    ) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setLoadItems(10);
        filterData(data, switchValue, search);
      }, 500);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setLoadItems(10);
        filterData(data, switchValue);
      }, 500);
    }
  };

  return (
    <>
      <NavBar
        movie
        handleSwitch={handleSwitch}
        handleSearch={handleSearch}
        searchValue={searchValue}
      />
      {filtered.length ? (
        <CardWrapper container>
          {filtered.map((item: any) => {
            return (
              <CardContainer key={`card-container-${item.id}`}>
                <MovieCard key={`movie-card-${item.id}`} item={item} />
              </CardContainer>
            );
          })}
        </CardWrapper>
      ) : (
        <LabelContainer>
          <Label>No search results...</Label>
        </LabelContainer>
      )}
      {loadItems <= filtered.length && (
        <LoadMore handleLoadMore={handleLoadMore} loadItems={loadItems} />
      )}
    </>
  );
};

export default Home;
