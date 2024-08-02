import React, { useEffect, useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import config from '../assets/aws-exports';;
import { Amplify } from 'aws-amplify';

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(config);

const client = generateClient({
    authMode: 'apiKey',
  });

const GalleryView = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data: plantData, errors } = await client.models.Plant.list();
        console.log(plantData, errors); // Inspect the returned data
        if (errors) {
          console.error("Error fetching plants:", errors);
        } else {
          setPlants(plantData);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? plants.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === plants.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="gallery-view">
      {loading ? (
        <p>Loading your plant collection...</p>
      ) : plants.length === 0 ? (
        <div className="placeholder">
          <p>You have no plants yet. Add your first plant!</p>
          <Button>Add Plant</Button>
        </div>
      ) : (
        <>
          <div className="arrow arrow-left" onClick={prevSlide}>
            &lt;
          </div>
          <div className="plant-gallery">
            <div
              className="plant-cards"
              style={{
                transform: `translateX(-${currentIndex * 220}px)`,
              }}
            >
              {plants.map((plant) => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.plantPhoto} alt={plant.plantNickname} />
                  <h3>{plant.plantNickname}</h3>
                  <p>Scientific Name: {plant.scientificName}</p>
                  <p>Age: {calculateAge(plant.birthdate)}</p>
                  <p>Next Reminder: {getSoonestReminder(plant.reminders)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="arrow arrow-right" onClick={nextSlide}>
            &gt;
          </div>
        </>
      )}
    </div>
  );
};

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getSoonestReminder = (reminders) => {
  if (!reminders || reminders.length === 0) return 'No reminders set';
  const sortedReminders = reminders.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return sortedReminders[0].date;
};

export default GalleryView;
