import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

const config = {
  provide: 'Config',
  useValue: {
    baseUrl: '/api'
  }
};

@Global()
@Module({})
export class ConfigModule {
  static forRoot(
    options: {
      path: string;
    }
  ): DynamicModule {
    const config: Provider = {
      provide: 'Config',
      useValue: {
        baseUrl: '/api' + options.path
      }
    };

    return {
      module: ConfigModule,
      providers: [config],
      exports: [config]
    };
  }
}