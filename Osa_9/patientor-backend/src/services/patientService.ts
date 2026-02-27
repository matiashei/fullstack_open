/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { v1 as uuidv1 } from 'uuid';
import patientsData from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient
  } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


export default {
  getPatients,
  findById,
  addPatient
};