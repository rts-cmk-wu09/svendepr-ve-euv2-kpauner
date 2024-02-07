import pb from "@/lib/pocketbase"
import { Class, ClassWithTrainer, ClassesTypes } from "@/types/classes"
import { Rating } from "@/types/ratings"
import { UserType } from "@/types/user"
import { UserClasses } from "@/types/user-classes"

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
  queryKey: [string, { sort?: string; limit?: number; fields?: string; filter?: string }]
}
export async function getClasses({ queryKey }: getClassesParams) {
  const [_key, { sort, limit, fields, filter }] = queryKey
  return pb.collection("classes").getFullList<Class>({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
    filter: filter || "",
  })
}

export async function getClassById({ queryKey }: { queryKey: [string, { id: string }] }) {
  const [_key, { id }] = queryKey
  return pb.collection("classes").getFullList<ClassWithTrainer>({
    filter: 'id = "' + id + '"',
    expand: "trainerId",
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

type getMyClassesProps = {
  queryKey: [string, { id: string }]
}
export async function getMyClasses({ queryKey }: getMyClassesProps) {
  const [_key, { id }] = queryKey
  return pb.collection("user_classes").getFullList<UserClasses>({
    filter: 'userId = "' + id + '"',
    expand: "classId",
  })
}

type getTrainersProps = {
  queryKey: [string, { role: string }]
}
export async function getTrainers({ queryKey }: getTrainersProps) {
  const [_key, { role }] = queryKey
  return pb.collection("users").getFullList<UserType>({
    filter: 'role = "' + role + '"',
    sort: "-created",
  })
}
