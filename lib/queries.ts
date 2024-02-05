import pb from "@/lib/pocketbase"

type getCollectionParams = {
  queryKey: [string, { records: string; sort?: string; limit?: number; fields?: string }]
}

pb.autoCancellation(false)

export default function getCollection({ queryKey }: getCollectionParams) {
  const [_key, { records, sort, limit, fields }] = queryKey
  return pb.collection(records).getFullList({
    sort: sort || "-created",
    perPage: limit || 30,
    fields: fields || "*",
  })
}
