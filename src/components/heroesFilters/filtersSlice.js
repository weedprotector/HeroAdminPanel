import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filterChanged
} = actions;