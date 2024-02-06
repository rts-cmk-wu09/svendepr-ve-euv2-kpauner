import { Class } from "./classes"

interface Expand {
  classId: Class
}

export type UserClasses = {
  collectionId: string
  collectionName: string
  created: string
  updated: string
  id: string
  classId: string
  userId: string
  expand: Expand
}
