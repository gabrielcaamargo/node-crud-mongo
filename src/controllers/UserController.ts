import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
  async createUser(request: Request, response: Response) {
    const { name, username, email } = request.body;
    
    if(!name) {
      return response.status(424).json({'error': 'Name is required'});
    }
    
    if(!username) {
      return response.status(424).json({'error': 'Username is required'});
    }
    
    if(!email) {
      return response.status(424).json({'error': 'Email is required'});
    }
    
    const userExist = await User.findOne({ email });

    if(userExist) {
      return response.status(400).json({'error': 'Email already in use'});
    }

    const user = new User({
      email,
      name,
      username
    });
    
    try {
      await user.save()
        .then(() => {
          response.status(201).json({'msg': 'User successfully created'});
        })
        .catch(() => {
          response.status(500).json({'error': 'Unexpected server error'});
        });
      



    } catch (error) {
      response.status(500).json({'error': `Cannot resolve error ${error}`});
    }
  }
  
  async listUsers(request: Request, response: Response) {
    const users = await User.find();

    response.json(users);
  }
  

  async updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, username, email } = request.body;

      const user = await User.findByIdAndUpdate(id, {
        name, 
        username, 
        email
      });



      response.status(201).json({'msg': 'User updated'});
    } catch {
      return response.status(400).json({'error': 'Unexpected server error'});
    }
  }


  async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = await User.findByIdAndDelete(id);
  
      response.status(201).json({'msg': 'User deleted'});
    } catch {
      return response.status(400).json({'error': 'Unexpected server error'});
    }
    
  }
}

export default new UserController();