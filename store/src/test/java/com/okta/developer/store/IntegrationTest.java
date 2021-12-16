package com.okta.developer.store;

import com.okta.developer.store.ReactiveSqlTestContainerExtension;
import com.okta.developer.store.StoreApp;
import com.okta.developer.store.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { StoreApp.class, TestSecurityConfiguration.class })
@ExtendWith(ReactiveSqlTestContainerExtension.class)
public @interface IntegrationTest {
}
