import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import 'jquery';
import 'bootstrap';
import { Card} from './Cards/Card';
import {CardApps} from './Cards/CardApps';

import {Boards} from './Cards/Boards';
import {Store} from './boot/Store';
import {app} from './boot/app';
import './scripts/Common';



let Board = new Boards();
let loadBoards = Board.getBoards();

