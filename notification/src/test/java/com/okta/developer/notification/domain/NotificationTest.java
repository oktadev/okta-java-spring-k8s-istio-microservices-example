package com.okta.developer.notification.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.okta.developer.notification.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NotificationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notification.class);
        Notification notification1 = new Notification();
        notification1.setId("id1");
        Notification notification2 = new Notification();
        notification2.setId(notification1.getId());
        assertThat(notification1).isEqualTo(notification2);
        notification2.setId("id2");
        assertThat(notification1).isNotEqualTo(notification2);
        notification1.setId(null);
        assertThat(notification1).isNotEqualTo(notification2);
    }
}
