import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@app/services';
import { UserRepository } from '@app/repositories';
import { User } from '@app/entities';
import { LoginRequest, RegisterRequest } from '@app/common/dto/request';
import { TokenResponse } from '@app/common/dto/response';
import { UnauthorizedError, ConflictError } from '@app/common/exceptions';

jest.mock('@nestjs/jwt');

describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: jest.Mocked<JwtService>;

    const mockUserRepository = {
        getByUsername: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get(JwtService);
    });

    describe('login', () => {
        it('should return a token if login is successful', async () => {
            const userId: number = 1;
            const req: LoginRequest = { username: 'testuser', password: 'testpass' };
            const user: User = { id: userId, username: 'testuser', password: 'hashedpassword' } as User;
            const mockAccessToken: string = 'testtoken';

            mockUserRepository.getByUsername.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
            jwtService.sign.mockReturnValue(mockAccessToken);

            const expected: TokenResponse = new TokenResponse(mockAccessToken);
            const actual: TokenResponse = await authService.login(req);

            expect(actual).toEqual(expected);
        });

        it('should throw an UnauthorizedError if username is not found', async () => {
            const req: LoginRequest = { username: 'wronguser', password: 'testpass' };

            mockUserRepository.getByUsername.mockResolvedValue(null);

            await expect(authService.login(req)).rejects.toThrow(UnauthorizedError);
        });

        it('should throw an UnauthorizedError if password is invalid', async () => {
            const req: LoginRequest = { username: 'testuser', password: 'wrongpass' };
            const user: User = { id: 1, username: 'testuser', password: 'hashedpassword' } as User;

            mockUserRepository.getByUsername.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(authService.login(req)).rejects.toThrow(UnauthorizedError);
        });
    });

    describe('register', () => {
        it('should successfully register a user', async () => {
            const req: RegisterRequest = { username: 'newuser', password: 'newpass', email: 'test@example.com', firstName: 'First', lastName: 'Last' };

            await expect(authService.register(req)).resolves.not.toThrow();

            expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                username: req.username,
                email: req.email,
                firstName: req.firstName,
                lastName: req.lastName
            }));
        });

        it('should throw an ConflictError if username is already taken', async () => {
            const req: RegisterRequest = { username: 'takenUsername', password: 'newpass', email: 'test@example.com', firstName: 'First', lastName: 'Last' };

            mockUserRepository.create.mockImplementation(async (user: User) => {
                if (user.username === 'takenUsername') {
                    throw new ConflictError('This Username is already taken.');
                }

                return {} as any;
            });

            await expect(authService.register(req)).rejects.toThrow(ConflictError);
        });

        it('should throw an ConflictError if email is already taken', async () => {
            const req: RegisterRequest = { username: 'newusername', password: 'newpass', email: 'takenEmail@example.com', firstName: 'First', lastName: 'Last' };

            mockUserRepository.create.mockImplementation(async (user: User) => {
                if (user.email === 'takenEmail@example.com') {
                    throw new ConflictError('This Email is already taken.');
                }

                return {} as any;
            });

            await expect(authService.register(req)).rejects.toThrow(ConflictError);
        });
    });

});