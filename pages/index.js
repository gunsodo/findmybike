import Head from 'next/head'
import React, { useRef, useEffect, useState } from 'react';
import Logo from '../components/logo'
import Settings from '../components/settings';
import Image from 'next/image';
import RegisterBike from '../components/registerBike';
import UsageDisc from '../components/usageDisc';
import ChooseBike from '../components/chooseBike';
import { sessionOptions } from '../utils/session';
import { PlusCircleIcon } from '@heroicons/react/solid';

// Prisma
import prisma from "../utils/prisma";

// iron-session
import { withIronSessionSsr } from "iron-session/next";

// Mapbox
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user) {
      const uid = req.session.user.id;
      const trackers = await prisma.tracker.findMany({
        where: {
          ownerId: uid,
        },
      });

      return {
        props: {
          trackers: trackers,
          uid : uid
        }
      };
    }
    else return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props:{},
    }
  }
  , sessionOptions)

export default function Home({ trackers , uid }) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;
  
  var locations = [];
  if (trackers.length > 0) {
    const tracker = trackers[0];
    locations = tracker && tracker.locations.map(str => str.split(",").map(Number));
  }

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [tracker, setBike] = useState(trackers[0]);

  async function logout() {
    await fetch('/api/user/logout');
    window.location = '/login';
  }

  useEffect(() => {
    const locations = tracker ? tracker.locations.map(str => str.split(",").map(Number)) : [];
    console.log(locations)

    if (!navigator.geolocation) {
      console.log("No navigator found");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: zoom
        });

        map.current.on('load', () => {
          if (!map.current.getSource('route')) {
            map.current.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': locations
              }
            }
          })};
          map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#3248a8',
              'line-width': 6
            }
          });
        });
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }, [tracker])

  // useEffect(() => {
  //   if (!map.current) return;
  //   map.current.flyTo({
  //     center: [lng, lat],
  //     zoom: zoom
  //   })
  // }, [lng, lat, zoom])


  return (
    <div>
      <Head>
        <title>Find My Bike</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Logo />
      <Settings logout={logout} />
      <main className={isOpen ? 'w-screen h-screen blur-md' : 'w-screen h-screen'}>
        <div id='map' className='map-container w-full h-full z-0' ref={mapContainer} />
        <div className='fixed bottom-0 right-0 w-full sm:w-[38rem] z-20 p-6 transition-all duration-500 space-y-4'>
          <div className='relative flex w-full h-full z-20 bg-white rounded-2xl drop-shadow-lg'>
            <ChooseBike trackers={trackers} setter={setBike} />
          </div>
          <div className='relative flex w-full h-full z-20 bg-white rounded-2xl drop-shadow-lg'>
            <div className='absolute flex flex-row w-full justify-end items-center z-20'>
              <button className='flex flex-row items-center space-x-1 px-2 py-1 m-4 rounded-lg bg-blue-600 hover:bg-blue-800 cursor-pointer text-white font-medium text-xs sm:text-sm'
                onClick={() => setIsOpen(true)}>
                <PlusCircleIcon className='h-4 w-4' />
                <p>Add</p>
              </button>
            </div>

            <div className='grid grid-cols-3 gap-4 h-full w-full justify-center p-4'>
              <div className='relative col-span-1 -m-2'>
                <Image alt='Bike icon' src='/bike.png' layout='fill' objectFit='contain' />
              </div>

              <div className='flex flex-col col-span-2 justify-center space-y-3'>
                <div>
                  <p className='font-bold text-2xl mb-2'>Main Bicycle</p>
                  <p className='text-xs sm:text-sm'>Last moved: 12 minutes ago</p>
                  <p className='text-xs sm:text-sm'>590 meters away from me</p>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <button className='bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-md p-1'>
                    <div className='flex flex-row space-x-1 items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p>Light</p>
                    </div>
                  </button>
                  <button className='bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-md p-1'>
                    <div className='flex flex-row space-x-1 items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                      <p>Sound</p>
                    </div>
                  </button>
                  {isLocked ?
                    <button className='bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-md p-1'>
                      <div className='flex flex-row space-x-1 items-center justify-center' onClick={() => setIsLocked(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p>Locked</p>
                      </div>
                    </button> :
                    <button className='bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-md p-1'>
                      <div className='flex flex-row space-x-1 items-center justify-center' onClick={() => setIsLocked(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <p>Unlocked</p>
                      </div>
                    </button>
                  }
                </div>
              </div>

              <div className='col-span-3'>
                <UsageDisc />
              </div>
            </div>
          </div>
        </div>
      </main>

      <RegisterBike isOpen={isOpen} setIsOpen={setIsOpen} uid={uid} />
    </div>
  )
}

