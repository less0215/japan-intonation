// 영상 학습 데이터 레지스트리 — 데모 1편 + 추가 영상(studyVideos.js)을 videoId로 조회.
import { STUDY_DEMO } from './studyDemo'
import { STUDY_VIDEOS } from './studyVideos'

export const STUDY_DATA = { [STUDY_DEMO.videoId]: STUDY_DEMO, ...STUDY_VIDEOS }

// 학습 데이터가 완비된(=쉐도잉 가능) 영상 id 집합
export const STUDY_READY = new Set(Object.keys(STUDY_DATA))

// 주어진 id의 학습 데이터(없으면 데모로 폴백)
export const getStudy = (id) => (id && STUDY_DATA[id]) || STUDY_DEMO
