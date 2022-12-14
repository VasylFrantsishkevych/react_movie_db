import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IMovieDetails, IMovieResponse, IMovieResults} from "../../interfaces";
import {AxiosError} from "axios";
import {movieService} from "../../services";

interface IState {
    movies: IMovieResults[],
    moviesPopular: IMovieResults[],
    movieId: IMovieDetails[],
    status: boolean | null,
    errors: string | null | unknown,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    movies: [],
    moviesPopular: [],
    movieId: [],
    status: null,
    errors: null,
    currentPage: 1,
    totalPages: 0,
}

const getAllMovies = createAsyncThunk<IMovieResponse, {id: string | undefined, page: string | null}>(
    'movieSlice/getAllMovies',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(id, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getPopularMovies = createAsyncThunk<IMovieResponse, void>(
    'genreSlice/getPopularMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getPopular();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMovieById = createAsyncThunk<IMovieDetails[], string | undefined>(
    'movieSlice/getMovieBtId',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id);
            return [data]
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllMovies.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.movies = results
                state.currentPage = page
                state.totalPages = total_pages
                state.status = false
            })
            .addCase(getAllMovies.rejected, (state, {payload}) => {
                state.errors = payload
            })
            .addCase(getPopularMovies.fulfilled, (state, {payload}) => {
                state.moviesPopular = payload.results
                state.status = false
            })
            .addCase(getMovieById.fulfilled, (state, {payload}) => {
                state.movieId = payload
                state.status = false
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1)
                state.status = type === 'pending';
            })
    }
})

const {reducer: movieReducer} = movieSlice;

const movieAction = {
    getAllMovies,
    getMovieById,
    getPopularMovies,
}

export {
    movieReducer,
    movieAction
}


