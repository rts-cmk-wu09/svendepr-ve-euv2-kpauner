import pb from "@/lib/pocketbase"
import { Class, ClassesTypes } from "@/types/classes"
import { Rating } from "@/types/ratings"

pb.autoCancellation(false)

type getCollectionParams = {
  queryKey: [string, { records: string; sort?: string; limit?: number; fields?: string }]
}
export async function getCollection({ queryKey }: getCollectionParams) {
  const [_key, { records, sort, limit, fields }] = queryKey
  return pb.collection(records).getFullList({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
  })
}

type getClassesParams = {
  queryKey: [string, { sort?: string; limit?: number; fields?: string }]
}
export async function getClasses({ queryKey }: getClassesParams) {
  const [_key, { sort, limit, fields }] = queryKey
  return pb.collection("classes").getFullList<Class>({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
  })
}

type getRatingByIdProps = {
  queryKey: [string, { id: string; sort?: string; limit?: number; fields?: string }]
}
export async function getRatingById({ queryKey }: getRatingByIdProps) {
  const [_key, { id }] = queryKey
  return pb.collection("ratings").getFullList<Rating>({
    filter: 'classId = "' + id + '"',
  })
}
