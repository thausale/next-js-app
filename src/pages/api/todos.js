const todos = ["gras", "drinken", "bbq"];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.json(todos);
  }
  if (req.method === "POST") {
    push(req.body.todo);
    res.json(todos);
  }
}
