import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: User): Observable<User>;
    login(user: User): Observable<any>;
    validateUser(email: string, password: string): Observable<User>;
    findByMail(email: string): Observable<User>;
    findUser(id: number): Observable<User>;
    findAll(): Observable<User[]>;
    paginate(options: IPaginationOptions): Observable<Pagination<User>>;
    paginateFilterByUsername(options: IPaginationOptions, user: User): Observable<Pagination<User>>;
    deleteOne(id: number): Observable<any>;
    updateOne(id: number, user: User): Observable<any>;
    updateRoleOfUser(id: number, user: User): Observable<any>;
}
