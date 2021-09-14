const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})

const port = 3001;

app.get('/', (req, res) => res.send('Hello World!'));


class Treenode {

  constructor(label) {
    this.id = (++Treenode.id_gen).toString()
    // Treenode.lineage[this.id]=[label]
    this.label =  label
    this.parent_id = null
    // this.parent_label = null
    this.children = []
    // Treenode.label_id[this.id] = label
  }

  add_child(child){
    this.children.push(child)
    child.parent_id = this.id
  }

}

function find_id(iter, parent_id) {
  if (iter.id === parent_id) {
    return iter
  }
  else {
    if (iter.children.length > 0) {
      for (var i = 0; i < iter.children.length; i++){
        retVal = find_id(iter.children[i], parent_id)
        if (retVal !== null) {
          return retVal
        }
      }
    }
  }
  return null
}

Treenode.id_gen = 0;
Treenode.label_id = {};

root = new Treenode('root')
ant = new Treenode('ant')
bear = new Treenode('bear')
cat = new Treenode('cat')
dog = new Treenode('dog')
elephant = new Treenode('elephant')
frog = new Treenode('frog')

root.add_child(ant)
root.add_child(bear)
bear.add_child(cat)
bear.add_child(dog)
dog.add_child(elephant)
root.add_child(frog)


var str = JSON.stringify(root, null, 5);

app.get('/api/tree', function (req, res) {
  res.send(root);
});

app.post('/api/tree', function (req, res) {
  // {"parent": "<id>", "label":<label>}
  var child = new Treenode(req.body.label);
  var parent_id = req.body.parent.toString();
  var parent_node = Treenode.label_id[parent_id]

  parent = find_id(root, parent_id)
  if (parent !== null) {
    parent.add_child(child)
  }
  else{ label = new Treenode(label)}
  res.send(root)

});

app.delete('/api/tree/:id', function (req,res) {
  label = find_id(root, req.params.id)
  if (label === null ) {
    res.send("There are no objects with that id.")
  }
  if (label.children.length === 0) {
    parent = find_id(root, label.parent_id)
    parent.children.pop(label)
  }
  res.send(root)
});

app.patch('/api/tree/:id', function (req, res) {
  //{current_id : new_parent_id}
  label = find_id(root, req.params.id)
  if (label === null ) {
    res.send("There are no objects with that id.")
  }
  prev_parent = find_id(root, label.parent_id)
  new_parent = find_id(root, req.body['current-id'])

  if (prev_parent.children !== null) {
    prev_parent.children.pop(label)
  }

  new_parent.add_child(label)
  res.send(root);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
