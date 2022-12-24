import React from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

// Makes any requests to any services gathers up all that data and
// then returns an object that has props in it and props
// are sent to react component which then renders them
export async function getStaticProps() {
  const res = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  )
  return {
    props: {
      pokemon: await res.json(),
    },
  }
}

export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <h2>Pokemon List</h2>
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
