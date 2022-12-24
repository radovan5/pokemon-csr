import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Details.module.css'

// Returns an object that has a list of all of the different paths that which should be generated
export async function getStaticPaths() {
  const res = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  )
  const pokemon = await res.json()

  return {
    paths: pokemon.map((pokemon) => ({
      params: {
        id: pokemon.id.toString(),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  )
  return {
    props: {
      pokemon: await res.json(),
    },
  }
}

export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <a className='button' href='/'>
          Back
        </a>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
