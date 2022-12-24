import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
      )
      setPokemon(await res.json())
    }
    getPokemon()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <a href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
