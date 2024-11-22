// Constants for point values and categories
const POINT_VALUES = {
    EASY: 100,
    MEDIUM: 200,
    HARD: 300,
    EXPERT: 400
  };
  
  const CATEGORIES = {
    REACT: 'React Fundamentals',
    STATE: 'State Management', 
    COMPONENTS: 'Components & Props',
    SQL: 'SQL & Database',
    EXPRESS: 'Express & Server',
    GIT: 'Git & Version Control',
    HOOKS: 'React Hooks',
    FULLSTACK: 'Full Stack Development'
  };
  
  // Function to shuffle array using Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const triviaQuestions = shuffleArray([
    // EASY QUESTIONS (100 points)
    {
      id: 'react-1',
      category: CATEGORIES.REACT,
      points: POINT_VALUES.EASY,
      question: "You get an error 'Adjacent JSX elements must be wrapped in an enclosing tag'. What's the quickest fix?",
      answer: "Wrap the elements in a Fragment (`<>...</>`) or a div. Fragments are preferred as they don't add extra DOM elements.",
      source: "10-01b_react-intro-components.md"
  },
  {
      id: 'state-1',
      category: CATEGORIES.STATE,
      points: POINT_VALUES.EASY,
      question: "After calling setCount(count + 1), you console.log the count but it shows the old value. Why?",
      answer: "State updates are **asynchronous**. The new value won't be available until the next render. If you need the new value immediately, use the setValue callback form or useEffect.",
      source: "10-01c_react-interaction-state.md"
  },
  {
      id: 'components-1',
      category: CATEGORIES.COMPONENTS,
      points: POINT_VALUES.EASY,
      question: "When importing a component, what's the difference between `import Header from './Header'` and `import { Header } from './Header'`?",
      answer: "The first one imports a default export, the second imports a named export. Default exports use `export default`, named exports use `export const Header`.",
      source: "10-01b_react-intro-components.md"
  },
  {
      id: 'sql-1',
      category: CATEGORIES.SQL,
      points: POINT_VALUES.EASY,
      question: "Your SELECT query returns more rows than expected. What clause should you add to filter results before grouping?",
      answer: "Add a **WHERE** clause. WHERE filters individual rows before any grouping happens. Example: `SELECT * FROM users WHERE active = true`",
      source: "08-02_sql-intro.md"
  },
  {
      id: 'express-1',
      category: CATEGORIES.EXPRESS,
      points: POINT_VALUES.EASY,
      question: "Your Express app keeps saying 'Cannot GET /users'. What's the most likely cause?",
      answer: "No route matches that path. Need to add a route handler:\n```javascript\napp.get('/users', (req, res) => {...})```",
      source: "08-01_express-routers.md"
  },
  {
      id: 'git-1',
      category: CATEGORIES.GIT,
      points: POINT_VALUES.EASY,
      question: "After making changes, your git status shows both red and green files. What's the difference?",
      answer: "**Red files**: Changes not yet staged (not added)\n**Green files**: Changes staged for commit (added with git add)",
      source: "08-04a_git-branching-with-pull-requests.md"
  },

  // MEDIUM QUESTIONS (200 points)
  {
      id: 'react-2',
      category: CATEGORIES.REACT,
      points: POINT_VALUES.MEDIUM,
      question: "Your React list rendering gives a warning about 'unique key prop'. What causes this and what should NOT be used as a key?",
      answer: "Causes: React needs unique keys to track list items efficiently.\n\nDON'T use:\n1. Array index (can cause bugs with reordering)\n2. Random numbers (changes every render)\n\nDO use: Database IDs or unique stable identifiers",
      source: "10-02b_react-lists.md"
  },
  {
      id: 'state-2',
      category: CATEGORIES.STATE,
      points: POINT_VALUES.MEDIUM,
      question: "You have a form input but typing doesn't update it. What's missing from this code?\n```jsx\n<input value={inputText} />```",
      answer: "Missing the `onChange` handler. Controlled inputs need both:\n```jsx\n<input \n  value={inputText} \n  onChange={(e) => setInputText(e.target.value)} \n/>```",
      source: "10-02a_react-inputs-change.md"
  },
  {
      id: 'components-2',
      category: CATEGORIES.COMPONENTS,
      points: POINT_VALUES.MEDIUM,
      question: "Your child component needs to send data back to its parent. What's the standard pattern for this?",
      answer: "Pass a callback function as a prop:\n```jsx\n// Parent\nfunction handleData(data) {...}\n<Child onData={handleData} />\n\n// Child\nprops.onData(someData)```",
      source: "10-03a_react-props.md"
  },
  {
      id: 'sql-2',
      category: CATEGORIES.SQL,
      points: POINT_VALUES.MEDIUM,
      question: "Your database shows weird characters instead of user input. What Express/PG concept prevents this and SQL injection?",
      answer: "Use **Parameterized Queries** with $1, $2 placeholders:\n```javascript\npool.query('SELECT * FROM users WHERE id=$1', [userId])```\n\nNever use string concatenation with queries!",
      source: "08-02a_pg-intro.md"
  },
  {
    id: 'express-3',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.MEDIUM,
    question: "Your route works in Postman but axios.get('/api/songs') returns 404. What's likely missing from your setup?",
    answer: "The proxy setting in package.json. Need to add:\n```json\n\"proxy\": \"http://localhost:5001\"```\n\nThis forwards requests from React (port 3000) to Express (port 5001)",
    source: "10-02c_full-stack-react.md"
},
{
    id: 'git-3',
    category: CATEGORIES.GIT,
    points: POINT_VALUES.MEDIUM,
    question: "You made changes directly to main instead of a feature branch. What steps fix this without losing changes?",
    answer: "1. Create new branch from current main\n2. `git checkout -b feature-branch`\n3. Reset main to origin\n4. `git checkout main`\n5. `git reset --hard origin/main`",
    source: "08-04a_git-branching-with-pull-requests.md"
},

// HARD Questions (300 points)
{
    id: 'react-4',
    category: CATEGORIES.REACT,
    points: POINT_VALUES.HARD,
    question: "Your useEffect is causing an infinite loop when monitoring an object. What's causing this and how do you fix it?",
    answer: "**Cause**: Objects create new references each render\n\n**Solutions**:\n1. Monitor specific properties: `[obj.id]`\n2. Move object outside component\n3. Use useMemo for stable reference\n4. Use primitive dependencies only",
    source: "10-02c_full-stack-react.md"
},
{
    id: 'state-3',
    category: CATEGORIES.STATE,
    points: POINT_VALUES.HARD,
    question: "Your setState calls in a loop don't all get applied. What's happening and how do you fix it?",
    answer: "**Problem**: React batches state updates\n\n**Solution**: Use functional update pattern:\n```javascript\nsetCount(prev => prev + 1)```\n\nThis ensures each update is based on the previous state",
    source: "10-01c_react-interaction-state.md"
},
{
    id: 'components-3',
    category: CATEGORIES.COMPONENTS,
    points: POINT_VALUES.HARD,
    question: "Your app needs the same data in many components. Instead of prop drilling through 5 levels, what's the solution?",
    answer: "Break into smaller components and lift state up:\n1. Move shared state to closest common ancestor\n2. Pass only to components that need it\n3. Consider restructuring component hierarchy\n\nThis is preferred over Context for simple data flow",
    source: "10-03a_react-props.md"
},
{
    id: 'sql-3',
    category: CATEGORIES.SQL,
    points: POINT_VALUES.HARD,
    question: "After adding rows to your table, ID numbers are no longer sequential. What PostgreSQL concept fixes this?",
    answer: "Use **SERIAL** for ID columns:\n```sql\nCREATE TABLE items (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(80)\n);```\n\nThis auto-increments and handles gaps in sequence",
    source: "08-02_sql-intro.md"
},
{
    id: 'express-4',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.HARD,
    question: "Your Express routes are becoming unmanageable with 20+ endpoints. How should you reorganize them?",
    answer: "Use **Express Router** to modularize:\n1. Create route files by feature\n2. Use express.Router()\n3. Move related routes to files\n4. Import and use in server.js with app.use('/path', router)\n\nExample for songs routes in separate file",
    source: "08-01_express-routers.md"
},

// EXPERT Questions (400 points)
{
    id: 'react-5',
    category: CATEGORIES.REACT,
    points: POINT_VALUES.EXPERT,
    question: "Your full-stack app's data flow is causing race conditions. Describe the complete correct flow from click to database and back.",
    answer: "**Correct Flow**:\n1. Click handler updates local state\n2. useEffect monitors state change\n3. Axios call in Promise chain\n4. Express route with middleware\n5. SQL query with parameterization\n6. Response handling with error checks\n7. State update with new data\n\nAll with proper error handling at each step",
    source: "10-02c_full-stack-react.md"
},
{
    id: 'state-4',
    category: CATEGORIES.STATE,
    points: POINT_VALUES.EXPERT,
    question: "You need to manage complex state with multiple related values that update together. What's the best structure?",
    answer: "**State Structure Options**:\n1. Single object with setState updater:\n```javascript\nsetState(prev => ({...prev, newData}))\n```\n2. Related values in one state:\n```javascript\nconst [formData, setFormData] = useState({name: '', email: ''})\n```\n3. Split only when values change independently",
    source: "10-02a_react-inputs-change.md"
},
{
    id: 'sql-4',
    category: CATEGORIES.SQL,
    points: POINT_VALUES.EXPERT,
    question: "Your database queries in a full-stack app need to be transaction-safe. How do you implement this with pg-pool?",
    answer: "Use **Transaction Blocks**:\n```javascript\nconst client = await pool.connect()\ntry {\n  await client.query('BEGIN')\n  // Multiple queries here\n  await client.query('COMMIT')\n} catch (e) {\n  await client.query('ROLLBACK')\n  throw e\n} finally {\n  client.release()\n}```",
    source: "08-02a_pg-intro.md"
},
{
    id: 'express-5',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.EXPERT,
    question: "Your Express app needs to handle errors consistently across all routes. Describe the complete error handling setup.",
    answer: "**Complete Error Setup**:\n1. Custom error middleware last:\n```javascript\napp.use((err, req, res, next) => {\n  console.log(err);\n  res.status(500).send(err.message);\n});\n```\n2. Route error handling:\n```javascript\ntry {\n  // route logic\n} catch (err) {\n  next(err);\n}```\n3. Async route wrapping for promises",
    source: "08-02a_pg-intro.md"
},
// ... (previous questions remain the same)

    // Additional EXPERT Questions
    {
      id: 'components-4',
      category: CATEGORIES.COMPONENTS,
      points: POINT_VALUES.EXPERT,
      question: "Your form component is handling both state and submit logic. Using component composition, how should you refactor this?",
      answer: "**Separation Pattern**:\n1. Form Component (presentation):\n```jsx\nfunction Form({onSubmit, children}) {\n  return <form onSubmit={onSubmit}>{children}</form>\n}\n```\n2. Container Component (logic):\n```jsx\nfunction FormContainer() {\n  const [data, setData] = useState({})\n  const handleSubmit = (e) => {...}\n  return <Form onSubmit={handleSubmit}>\n    {/* form fields */}\n  </Form>\n}```",
      source: "10-03a_react-props.md"
  },
  {
      id: 'git-5',
      category: CATEGORIES.GIT,
      points: POINT_VALUES.EXPERT,
      question: "Your team's pull request process is causing merge conflicts. How do you set up a robust PR workflow that prevents this?",
      answer: "**Complete PR Workflow**:\n1. Daily main pulls:\n```bash\ngit checkout main\ngit pull origin main\n```\n2. Feature branch strategy:\n```bash\ngit checkout -b feature-name\n```\n3. Regular rebasing:\n```bash\ngit checkout feature-name\ngit rebase main\n```\n4. Clean commits\n5. Review process with specific reviewers\n6. PR template with checklist",
      source: "08-04a_git-branching-with-pull-requests.md"
  },
  {
      id: 'state-5',
      category: CATEGORIES.STATE,
      points: POINT_VALUES.EXPERT,
      question: "You have multiple components using shared state with prop drilling. Describe how to refactor this using proper state management patterns from the lectures.",
      answer: "**State Management Refactor**:\n1. Identify shared state\n2. Lift state to common ancestor\n3. Create container component:\n```jsx\nfunction DataContainer() {\n  const [data, setData] = useState([])\n  const handleUpdate = (newData) => {\n    setData(newData)\n  }\n  return (\n    <>\n      <DisplayComponent data={data}/>\n      <UpdateComponent onUpdate={handleUpdate}/>\n    </>\n  )\n}```\n4. Pass only needed props to each child\n5. Use callback props for updates",
      source: "10-03a_react-props.md"
  },
  {
      id: 'express-6',
      category: CATEGORIES.EXPRESS,
      points: POINT_VALUES.EXPERT,
      question: "Your full-stack app needs to handle file uploads, database storage, and error states. Describe the complete implementation.",
      answer: "**Full Implementation**:\n1. Express Setup:\n```javascript\napp.use(express.json());\napp.use(express.static('uploads'));\n```\n2. Route Handler:\n```javascript\napp.post('/upload', async (req, res) => {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    // Insert file record\n    // Handle file storage\n    await client.query('COMMIT');\n    res.sendStatus(201);\n  } catch (error) {\n    await client.query('ROLLBACK');\n    res.sendStatus(500);\n  }\n});\n```\n3. Error handling middleware\n4. Client-side feedback",
      source: "10-02c_full-stack-react.md"
  },
  {
      id: 'sql-6',
      category: CATEGORIES.SQL,
      points: POINT_VALUES.EXPERT,
      question: "Your database queries need to handle related data across multiple tables efficiently. Show the correct query structure with joins and error handling.",
      answer: "**Complete Database Pattern**:\n1. Query Structure:\n```sql\nSELECT a.*, b.name \nFROM table_a a\nLEFT JOIN table_b b ON a.b_id = b.id\nWHERE a.active = true;\n```\n2. Node Implementation:\n```javascript\nconst query = {\n  text: 'SELECT * FROM table_a WHERE id = $1',\n  values: [id]\n};\ntry {\n  const result = await pool.query(query);\n  return result.rows;\n} catch (error) {\n  throw new Error(`Database error: ${error.message}`);\n}```",
      source: "08-02_sql-intro.md"
  },
  {
      id: 'react-6',
      category: CATEGORIES.REACT,
      points: POINT_VALUES.EXPERT,
      question: "Your React components are re-rendering too often with complex state updates. How do you optimize the performance?",
      answer: "**Performance Optimization**:\n1. State Updates:\n```javascript\nconst [data, setData] = useState([])\n// Batch updates\nsetData(prev => [...prev, newItem])\n```\n2. useEffect Dependencies:\n```javascript\nuseEffect(() => {\n  // Only run when necessary\n}, [specificDependency])\n```\n3. Component Structure:\n```jsx\n// Break into smaller components\nfunction ItemList({items}) {\n  return items.map(item => \n    <Item key={item.id} {...item} />\n  )\n}\n```\n4. Lift computation up when possible",
      source: "10-01c_react-interaction-state.md"
  },
  {
    id: 'easy-react-1',
    category: CATEGORIES.REACT,
    points: POINT_VALUES.EASY,
    question: "Your component renders nothing and says 'Component is not defined'. What's the likely missing line at the top of your file?",
    answer: "Missing the import statement:\n```javascript\nimport { Component } from 'react';\n```\nor for a component from a file:\n```javascript\nimport Component from './Component';\n```",
    source: "10-01a_react-orientation.md"
},
{
    id: 'easy-state-1',
    category: CATEGORIES.STATE,
    points: POINT_VALUES.EASY,
    question: "You called useState but get an error 'React Hook useState is called in function 'handle' that is neither a React function component nor a custom React Hook function'. What's wrong?",
    answer: "useState can only be called inside:\n1. React function components (must start with capital letter)\n2. Custom hooks (must start with 'use')\n\nCan't be called in regular functions or event handlers.",
    source: "10-01c_react-interaction-state.md"
},
{
    id: 'easy-sql-1',
    category: CATEGORIES.SQL,
    points: POINT_VALUES.EASY,
    question: "You get this error in Postico: 'relation \"songs\" does not exist'. What basic setup step did you forget?",
    answer: "Need to create the table first with CREATE TABLE:\n```sql\nCREATE TABLE songs (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(80)\n);```",
    source: "08-02_sql-intro.md"
},
{
    id: 'easy-express-1',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.EASY,
    question: "Your POST request returns 'undefined' for req.body. What middleware are you probably missing?",
    answer: "Missing body-parser middleware:\n```javascript\napp.use(express.json());\napp.use(express.urlencoded({extended: true}));```",
    source: "08-01_express-routers.md"
},

// Additional MEDIUM Questions (200 points)
{
    id: 'medium-react-1',
    category: CATEGORIES.REACT,
    points: POINT_VALUES.MEDIUM,
    question: "Your map function renders a list but you see all items duplicated. What's likely happening in your return statement?",
    answer: "Probably returning from both the map AND the component:\n```javascript\n// WRONG\nreturn (\n  items.map(item => {\n    return <li>{item}</li>\n    return <div>{items}</div>  // Double return!\n  })\n)\n\n// CORRECT\nreturn items.map(item => <li>{item}</li>)```",
    source: "10-02b_react-lists.md"
},
{
    id: 'medium-express-1',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.MEDIUM,
    question: "Your Express route gets the same request twice. What browser behavior and HTTP method is likely causing this?",
    answer: "Browser sends preflight OPTIONS request before POST/PUT/DELETE requests. Solution:\n```javascript\napp.use(cors());\n// or handle OPTIONS specifically\napp.options('*', cors());```",
    source: "08-01_express-routers.md"
},
{
    id: 'medium-sql-1',
    category: CATEGORIES.SQL,
    points: POINT_VALUES.MEDIUM,
    question: "Your INSERT query works in Postico but returns an error in your Express route. What's the difference in how you need to write it?",
    answer: "In Express with pg, use parameterized queries:\n```javascript\n// Instead of string concatenation\nconst query = {\n  text: 'INSERT INTO songs (name) VALUES ($1)',\n  values: [songName]\n};\npool.query(query);```",
    source: "08-02a_pg-intro.md"
},

// Additional HARD Questions (300 points)
{
    id: 'hard-react-1',
    category: CATEGORIES.REACT,
    points: POINT_VALUES.HARD,
    question: "Your useEffect fetches data but components unmount before the response returns, causing errors. How do you fix this?",
    answer: "Use a cleanup function in useEffect:\n```javascript\nuseEffect(() => {\n  let mounted = true;\n\n  const fetchData = async () => {\n    const result = await axios.get('/data');\n    if (mounted) {\n      setData(result.data);\n    }\n  };\n  fetchData();\n\n  return () => mounted = false;\n}, []);```",
    source: "10-02c_full-stack-react.md"
},
{
    id: 'hard-state-1',
    category: CATEGORIES.STATE,
    points: POINT_VALUES.HARD,
    question: "Every keystroke in your form causes a full re-render of a expensive calculation. How do you optimize this?",
    answer: "Move expensive calculations outside the render and control when they update:\n```javascript\nconst [input, setInput] = useState('');\n\n// Only recalculate when specific values change\nuseEffect(() => {\n  doExpensiveCalculation();\n}, [dependencyValue]); // Not on every input change\n\n<input value={input} onChange={(e) => setInput(e.target.value)} />```",
    source: "10-01c_react-interaction-state.md"
},
{
    id: 'hard-express-1',
    category: CATEGORIES.EXPRESS,
    points: POINT_VALUES.HARD,
    question: "Users report database changes aren't showing up right away in your full stack app. What's the likely issue in your data flow?",
    answer: "Missing update after database change:\n```javascript\n// After successful POST/PUT:\nawait pool.query(insertQuery);\n\n// Need to GET updated data:\nconst result = await pool.query(selectQuery);\nres.send(result.rows);\n\n// Then on client:\n.then(response => {\n  setData(response.data); // Update state with new data\n})```",
    source: "10-02c_full-stack-react.md"
},
{
    id: 'hard-sql-1',
    category: CATEGORIES.SQL,
    points: POINT_VALUES.HARD,
    question: "Your database timestamps are showing the wrong timezone. How do you fix this in PostgreSQL and Express?",
    answer: "Three parts to fix:\n1. Database column:\n```sql\nCREATE TABLE events (\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n```\n2. PostgreSQL connection:\n```javascript\nconst pool = new Pool({\n  ...\n  timezone: 'UTC'\n});\n```\n3. Client-side formatting:\n```javascript\nnew Date(timestamp).toLocaleString()```",
    source: "08-02_sql-intro.md"
}
  ]);

