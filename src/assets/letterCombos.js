export const letterCombos = [
  {
    letters: 'eagxdn',
    words: ['aged', 'dean', 'and', 'end', 'age', 'den', 'axe']
  },
  {
    letters: 'oapbdt',
    words: [
      'adopt',
      'boat',
      'atop',
      'toad',
      'top',
      'bad',
      'pat',
      'tap',
      'dot',
      'pot',
      'bat',
      'opt',
      'pad',
      'apt',
      'tab',
      'pod',
      'dab',
      'ado',
      'oat',
      'bot',
    ]
  },
  {
    letters: 'oexphn',
    words: ['phone', 'open', 'hope', 'oxen', 'one', 'pen', 'hop', 'hen']
  },
  { letters: 'eeqwrl', words: ['were', 'reel', 'lee', 'wee', 'eel'] },
  { letters: 'uubrvn', words: ['burn', 'run', 'rub', 'bun', 'urn'] },
  {
    letters: 'iotbkh',
    words: ['both', 'bit', 'hit', 'hot', 'kit', 'bio', 'bot']
  },
  {
    letters: 'iartpl',
    words: [
      'trial',
      'trail',
      'part',
      'trip',
      'pair',
      'rail',
      'tail',
      'trap',
      'liar',
      'air',
      'art',
      'pat',
      'tap',
      'par',
      'tip',
      'pit',
      'lit',
      'lap',
      'lip',
      'rat',
      'apt',
      'pal',
      'rap',
      'rip',
      'tar',
      'alt',
    ]
  },
  { letters: 'eeqfpl', words: ['feel', 'peel', 'flee', 'fee', 'eel'] },
  { letters: 'uijbsy', words: ['busy', 'buys', 'buy', 'bus', 'sub'] },
  {
    letters: 'eehrtp',
    words: [
      'there',
      'three',
      'ether',
      'here',
      'tree',
      'peer',
      'thee',
      'the',
      'her',
      'per',
      'pet',
      'tee',
    ]
  },
  {
    letters: 'uotpvw',
    words: ['out', 'two', 'put', 'top', 'pot', 'opt', 'tow', 'vow']
  },
  {
    letters: 'eorrlw',
    words: ['lower', 'role', 'wore', 'lore', 'low', 'row', 'ore', 'owl', 'woe']
  },
  {
    letters: 'uopdlc',
    words: [
      'could',
      'cloud',
      'cold',
      'loud',
      'coup',
      'old',
      'cup',
      'cop',
      'cod',
      'pod',
    ]
  },
  {
    letters: 'oetnjg',
    words: [
      'note',
      'gone',
      'tone',
      'not',
      'one',
      'get',
      'got',
      'net',
      'ten',
      'jet',
      'ton',
      'ego',
      'toe',
    ]
  },
  {
    letters: 'ionvnl',
    words: ['lion', 'oil', 'inn', 'ion', 'nil']
  },
  {
    letters: 'iebfhl',
    words: ['life', 'file', 'bile', 'lie']
  },
  {
    letters: 'oakwht',
    words: [
      'what',
      'hawk',
      'oath',
      'thaw',
      'who',
      'two',
      'how',
      'hot',
      'hat',
      'oak',
      'tow',
      'oat',
    ]
  },
  {
    letters: 'aicxrs',
    words: [
      'axis',
      'scar',
      'arcs',
      'airs',
      'cars',
      'six',
      'air',
      'car',
      'sir',
      'arc',
    ]
  },
  {
    letters: 'aiwnrk',
    words: [
      'rain',
      'rank',
      'warn',
      'akin',
      'wink',
      'air',
      'war',
      'win',
      'ran',
      'raw',
      'ink',
      'kin',
    ]
  },
  {
    letters: 'aeztsn',
    words: [
      'east',
      'seat',
      'neat',
      'nest',
      'eats',
      'sane',
      'ante',
      'zest',
      'ants',
      'nets',
      'tens',
      'set',
      'net',
      'ten',
      'sea',
      'sat',
      'eat',
      'tea',
      'ate',
      'tan',
      'ant',
      'zen',
    ]
  },
  {
    letters: 'iuftsf',
    words: ['stuff', 'stiff', 'suit', 'fist', 'fits', 'its', 'fit', 'sit']
  },
  {
    letters: 'eaycps',
    words: [
      'space',
      'paces',
      'case',
      'easy',
      'pace',
      'cape',
      'spec',
      'pays',
      'caps',
      'apes',
      'peas',
      'say',
      'pay',
      'yes',
      'sea',
      'ace',
      'spa',
      'sap',
      'spy',
      'pea',
      'ape',
    ]
  },
  {
    letters: 'eivjfl',
    words: [
      'life',
      'five',
      'live',
      'file',
      'evil',
      'veil',
      'vile',
      'lie',
      'vie',
    ]
  },
  {
    letters: 'aognyr',
    words: [
      'angry',
      'organ',
      'agony',
      'groan',
      'argon',
      'gray',
      'rang',
      'yarn',
      'yoga',
      'any',
      'ago',
      'nor',
      'ran',
      'ray',
      'rag',
      'oar',
    ]
  },
  {
    letters: 'eiyrtq',
    words: ['tier', 'tire', 'rite', 'yet', 'try', 'tie', 'rye']
  },
  {
    letters: 'eudlkx',
    words: ['duke', 'duel', 'led', 'due', 'elk']
  },
  {
    letters: 'eowxfd',
    words: [
      'owed',
      'few',
      'fox',
      'fed',
      'owe',
      'wed',
      'foe',
      'dew',
      'woe',
      'ode',
    ]
  },
  {
    letters: 'eomjhd',
    words: ['home', 'mode', 'dome', 'doe', 'hem', 'ode']
  },
  {
    letters: 'aefszc',
    words: ['cafes', 'faces', 'case', 'face', 'safe', 'cafe', 'sea', 'ace']
  },
  {
    letters: 'aigdfp',
    words: ['paid', 'aid', 'gap', 'dip', 'pad', 'dig', 'fig', 'pig', 'fad']
  },
  {
    letters: 'aessxp',
    words: [
      'pass',
      'apex',
      'axes',
      'seas',
      'peas',
      'apes',
      'sea',
      'spa',
      'sap',
      'axe',
      'pea',
      'ape',
    ]
  },
  {
    letters: 'aoxgft',
    words: [
      'goat',
      'got',
      'ago',
      'tax',
      'fax',
      'fox',
      'fat',
      'tag',
      'fog',
      'oat',
    ]
  },
  {
    letters: 'aowtgv',
    words: ['goat', 'two', 'got', 'ago', 'tag', 'vat', 'tow', 'vow', 'oat']
  },
  {
    letters: 'oiwcvt',
    words: ['two', 'cow', 'wit', 'tow', 'cot', 'vow', 'tic']
  },
  {
    letters: 'aemtss',
    words: [
      'asset',
      'steam',
      'masse',
      'seams',
      'seats',
      'stems',
      'mates',
      'teams',
      'meats',
      'same',
      'team',
      'mass',
      'seat',
      'meat',
      'mess',
      'stem',
      'mate',
      'mesa',
      'eats',
      'mast',
      'tame',
      'seam',
      'sets',
      'meta',
      'seas',
      'mats',
      'set',
      'met',
      'sea',
      'sat',
      'eat',
      'tea',
      'ate',
      'mat',
    ]
  },
  { letters: 'oalxyl', words: ['loyal', 'alloy', 'ally', 'all', 'lay'] },
  {
    letters: 'aoclvc',
    words: ['vocal', 'coal', 'cola', 'coca', 'oval']
  },
  {
    letters: 'eicdbh',
    words: ['hide', 'dice', 'bed', 'die', 'bid', 'ice', 'hid']
  },
  {
    letters: 'auphlc',
    words: ['haul', 'chap', 'clap', 'cup', 'cap', 'lap', 'pal']
  },
  { letters: 'oemhmz', words: ['home', 'memo', 'mom', 'hem'] },
  {
    letters: 'eaxvrh',
    words: [
      'have',
      'hear',
      'hare',
      'vera',
      'are',
      'her',
      'era',
      'ear',
      'axe',
      'var',
    ]
  },
  {
    letters: 'iotycx',
    words: ['toxic', 'city', 'toy', 'icy', 'cot', 'tic']
  },
  {
    letters: 'uegzld',
    words: ['glued', 'glue', 'duel', 'due', 'leg', 'gel', 'dug']
  },
  { letters: 'oaggjn', words: ['gang', 'gong', 'ago', 'gag'] },
  {
    letters: 'audsnm',
    words: [
      'sand',
      'dams',
      'and',
      'man',
      'sun',
      'sum',
      'sad',
      'mad',
      'mud',
      'dam',
    ]
  },
  {
    letters: 'aeqtry',
    words: [
      'year',
      'rate',
      'tear',
      'tray',
      'are',
      'yet',
      'art',
      'try',
      'eat',
      'era',
      'tea',
      'ray',
      'ear',
      'ate',
      'rat',
      'rye',
      'tar',
    ]
  },
  {
    letters: 'aerxhz',
    words: ['hear', 'hare', 'haze', 'are', 'her', 'era', 'ear', 'axe']
  },
  {
    letters: 'iakrzm',
    words: ['mark', 'air', 'arm', 'aim', 'ram', 'rim', 'mar']
  },
  {
    letters: 'iublpr',
    words: ['blur', 'pub', 'lip', 'rip', 'rub', 'rib']
  },
  {
    letters: 'aikytc',
    words: ['city', 'tick', 'tack', 'act', 'cat', 'icy', 'tic']
  },
  {
    letters: 'uatbrx',
    words: [
      'but',
      'tax',
      'art',
      'bar',
      'bat',
      'rat',
      'tab',
      'rub',
      'tub',
      'tar',
      'bra',
    ]
  },
  {
    letters: 'aedwqx',
    words: ['waxed', 'wade', 'wax', 'awe', 'axe', 'dew']
  },
  {
    letters: 'aeljsv',
    words: ['slave', 'sale', 'save', 'seal', 'vale', 'vase', 'sea', 'ale']
  },
  {
    letters: 'ietpfl',
    words: [
      'life',
      'left',
      'felt',
      'file',
      'lift',
      'pile',
      'flip',
      'tile',
      'fit',
      'lie',
      'tie',
      'tip',
      'pet',
      'pit',
      'lit',
      'pie',
      'lip',
    ]
  },
  {
    letters: 'eurvtg',
    words: ['true', 'urge', 'get', 'gut', 'vet', 'rug', 'tug']
  },
  {
    letters: 'eotmsm',
    words: ['some', 'most', 'stem', 'memo', 'toes', 'set', 'met', 'mom', 'toe']
  },
  {
    letters: 'aibxdl',
    words: [
      'laid',
      'dial',
      'bail',
      'bald',
      'bad',
      'aid',
      'bid',
      'lab',
      'lid',
      'lad',
      'dab',
    ]
  },
  {
    letters: 'eospdn',
    words: [
      'spend',
      'nodes',
      'ponds',
      'posed',
      'opens',
      'does',
      'open',
      'done',
      'send',
      'nose',
      'dose',
      'pose',
      'pond',
      'node',
      'sped',
      'dope',
      'pens',
      'nods',
      'pods',
      'ends',
      'ones',
      'one',
      'end',
      'son',
      'pen',
      'nod',
      'den',
      'pod',
      'ode',
    ]
  },
  {
    letters: 'oanfdv',
    words: ['fond', 'nova', 'and', 'van', 'fan', 'nod', 'fad', 'ado']
  },
  { letters: 'oubnpn', words: ['upon', 'noun', 'pub', 'nun', 'bun', 'pun'] },
  {
    letters: 'eaqsyl',
    words: [
      'easy',
      'sale',
      'seal',
      'slay',
      'lays',
      'say',
      'yes',
      'sea',
      'lay',
      'ale',
      'sly',
    ]
  },
  {
    letters: 'oedrnv',
    words: [
      'vendor',
      'drove',
      'over',
      'done',
      'oven',
      'node',
      'rode',
      'dove',
      'one',
      'end',
      'red',
      'nor',
      'ore',
      'rod',
      'nod',
      'doe',
      'den',
      'ode',
    ]
  },
  { letters: 'iudqht', words: ['quit', 'quid', 'hit', 'hut', 'hid'] },
  {
    letters: 'oavbrf',
    words: [
      'favor',
      'bravo',
      'boar',
      'afro',
      'for',
      'far',
      'bar',
      'rob',
      'bra',
      'oar',
    ]
  },
  {
    letters: 'oeprkk',
    words: ['poker', 'rope', 'pork', 'poke', 'pore', 'per', 'ore']
  },
  {
    letters: 'iavfnd',
    words: [
      'find',
      'avid',
      'vain',
      'and',
      'via',
      'aid',
      'van',
      'fan',
      'fin',
      'fad',
    ]
  },
  {
    letters: 'iewdhn',
    words: [
      'widen',
      'when',
      'wide',
      'wind',
      'wine',
      'hide',
      'dine',
      'hind',
      'new',
      'end',
      'win',
      'die',
      'den',
      'wed',
      'hid',
      'hen',
      'dew',
    ]
  },
  {
    letters: 'eamdtt',
    words: [
      'made',
      'team',
      'date',
      'meat',
      'mate',
      'mead',
      'tame',
      'meta',
      'met',
      'eat',
      'tea',
      'mad',
      'ted',
      'ate',
      'dam',
      'mat',
    ]
  },
  {
    letters: 'eifldv',
    words: [
      'field',
      'devil',
      'filed',
      'lived',
      'life',
      'five',
      'live',
      'file',
      'evil',
      'fled',
      'idle',
      'dive',
      'lied',
      'veil',
      'vile',
      'led',
      'die',
      'lie',
      'fed',
      'lid',
    ]
  }
]
