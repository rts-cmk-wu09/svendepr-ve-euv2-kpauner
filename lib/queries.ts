import pb from "@/lib/pocketbase"
import { Class, ClassesTypes } from "@/types/classes"

type getCollectionParams = {
  queryKey: [string, { records: string; sort?: string; limit?: number; fields?: string }]
}
type getClassesParams = {
  queryKey: [string, { sort?: string; limit?: number; fields?: string }]
}

pb.autoCancellation(false)

export async function getCollection({ queryKey }: getCollectionParams) {
  const [_key, { records, sort, limit, fields }] = queryKey
  return pb.collection(records).getFullList({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
  })
}

export async function getClasses({ queryKey }: getClassesParams) {
  const [_key, { sort, limit, fields }] = queryKey
  return pb.collection("classes").getFullList<Class>({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
  })
}
