const mongoose = require('mongoose');
const Place = require('../model/place');
const hereMaps = require('../utils/hereMaps');
const place = require('../model/place');

mongoose.connect('mongodb://127.0.0.1/yelp_clone')
  .then((result) => {
    console.log('connected to mongodb')
  }).catch((err) => {
    console.log(err)
  });

async function seedPlaces() {
  const places = [
    {
      title: 'Taman Mini Indonesia Indah',
      price: 20000,
      description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
      location: 'Taman Mini Indonesia Indah, Jakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pantai Kuta',
      price: 0,
      description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
      location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Borobudur',
      price: 0,
      description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
      location: 'Borobudur, Magelang, Central Java',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Kawah Putih',
      price: 0,
      description: 'Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat',
      location: 'Kawah Putih, Ciwidey, West Java',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Malioboro',
      price: 0,
      description: 'Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas',
      location: 'Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pantai Tanjung Aan',
      price: 10000,
      description: 'Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat',
      location: 'Pantai Tanjung Aan, Lombok, West Nusa Tenggara',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Bukit Bintang',
      price: 0,
      description: 'Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia',
      location: 'Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Candi Prambanan',
      price: 25000,
      description: 'Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta',
      location: 'Candi Prambanan, Sleman, Special Region of Yogyakarta',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Danau Toba',
      price: 0,
      description: 'Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara',
      location: 'Danau Toba, North Sumatra',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Kawah Ijen',
      price: 100000,
      description: 'Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur',
      location: 'Kawah Ijen, Banyuwangi, East Java',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pantai Sanur',
      price: 0,
      description: 'Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit',
      location: 'Pantai Sanur, Denpasar, Bali',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },

    {
      title: 'Candi Borobudur',
      price: 25000,
      description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
      location: 'Candi Borobudur, Borobudur, Magelang, Central Java',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pulau Komodo',
      price: 5000000,
      description: 'Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia',
      location: 'Pulau Komodo, East Nusa Tenggara',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Taman Nasional Gunung Rinjani',
      price: 150000,
      description: 'Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia',
      location: 'Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Bukit Tinggi',
      price: 0,
      description: 'Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa',
      location: 'Bukit Tinggi, West Sumatra',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pulau Weh',
      price: 0,
      description: 'Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa',
      location: 'Pulau Weh, Sabang, Aceh',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Pulau Lombok',
      price: 0,
      description: 'Pulau di Indonesia yang terkenal dengan keindahan pantainya',
      location: 'Pulau Lombok, West Nusa Tenggara',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    },
    {
      title: 'Tanjung Lesung',
      price: 100000,
      description: 'Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang',
      location: 'Tanjung Lesung, Pandeglang, Banten',
      image: 'https://source.unsplash.com/collection/2349781/1280x720'
    }
  ]
  try {
  const newPlace = await Promise.all(places.map(async (place) => {

      let geoData = await hereMaps.geometry(place.location);
      
      if (!geoData) {
      geoData = { type: 'Point', coordinates: [116.32883, -8.90952] };
    }
    console.log(geoData);

    return {
      ...place,
      author: '66b389d0fdf363fd332bcea0',
      images: {
        url: 'public\\image\\image-1724248477833-176606286.png',
        filename: 'image-1724248477833-176606286.png'
      },
      geometry: { ...geoData }
    };
    
  }));
    console.log('Deleting all existing places...');
    await Place.deleteMany({});
    console.log('Inserting new places...');
    await Place.insertMany(newPlace);
    console.log('Data berhasil disimpan');
  } catch (error) {
    //  new ExpressError(`Error while processing place ${place.title}`, 500);
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();