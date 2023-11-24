export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
  
    console.log(event.node.req.headers)
})