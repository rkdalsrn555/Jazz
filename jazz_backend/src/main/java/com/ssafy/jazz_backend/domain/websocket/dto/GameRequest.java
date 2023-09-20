package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GameRequest {

    private String session;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GameRequest)) {
            return false;
        }
        GameRequest that = (GameRequest) o;
        return Objects.equals(this.session, that.session);
    }

    @Override
    public int hashCode() {
        return session != null ? session.hashCode() : 0;
    }
}
