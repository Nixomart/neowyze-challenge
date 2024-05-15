"use client"
import React from 'react'
import Loading from '../components/Loading';
import { useFilms } from '@/api/useFilms';
import DataGridFilms from './components/DataGridFilms';

export default function Page() {
    const {data, isFetched} = useFilms(null)
    return isFetched == false ? <Loading /> : <DataGridFilms films={data} />;
}


