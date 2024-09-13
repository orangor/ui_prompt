import HttpClient from './HttpClients'

// Base URLs
const API_BASE_URL = 'http://localhost:8085' //'https://43.143.51.202' //

// API Endpoints
const SEED_PATHS = {
  GET_DATA: '/seed/get_data',
  GET_CELL: '/seed/get_cell',
  ADD_CARD: '/seed/add_card',
  ADD_CELL: '/seed/add_cell',
  UPDATE_CELL: '/seed/update_cell',
  GOOD_SENTENCES: '/seed/good_sentences',
  GOOD_SENTENCES_LIKE: '/seed/good_sentences_like',
  GET_TAG: '/seed/get_tag',
}

export const fetchCard = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.GET_DATA}`, { param })
}

export const fetchCardCell = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.GET_CELL}`, { param })
}

export const addCard = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.ADD_CARD}`, { param })
}

export const addCardCell = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.ADD_CELL}`, { param })
}

export const updateCardCell = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.UPDATE_CELL}`, { param })
}

export const fetchGoodSentences = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.GOOD_SENTENCES}`, { param })
}

export const fetchGoodSentencesLike = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.GOOD_SENTENCES_LIKE}`, { param })
}

export const fetchTag = (param: any) => {
  return HttpClient.post(`${API_BASE_URL}${SEED_PATHS.GET_TAG}`, { param })
}

export const fetchContentInfosByQuery = (params: {
  tags?: string
  content?: string
  fileType?: string
  page?: number
  limit?: number
}) => {
  return HttpClient.post(`${API_BASE_URL}/contentInfo`, { params })
}
export const fetchHotlistEntriesByQuery = (params: {
  platform?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}) => {
  return HttpClient.post(`${API_BASE_URL}/hotList`, { params })
}
export default {
  fetchCard,
  fetchCardCell,
  addCard,
  addCardCell,
  fetchTag,
  fetchContentInfosByQuery,
  fetchHotlistEntriesByQuery,
}
